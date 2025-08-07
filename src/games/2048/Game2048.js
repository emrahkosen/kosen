import React, { useState, useEffect, useCallback } from 'react';

// --- Helper Functions & Constants ---
const GRID_SIZE = 4;
const WINNING_TILE = 2048;

// Generates a unique ID for tiles
const getUniqueId = () => Math.random().toString(36).substring(2, 9);

// --- Game Logic ---
// This object encapsulates all the core game mechanics.
const game = {
    cells: [],
    score: 0,
    over: false,
    won: false,
    callbacks: {},

    // Initialize or restart the game state
    init() {
        this.cells = Array(GRID_SIZE * GRID_SIZE).fill(null).map(() => ({ value: 0, id: getUniqueId(), merged: false, isNew: false }));
        this.score = 0;
        this.over = false;
        this.won = false;
        this.addRandomTile();
        this.addRandomTile();
    },

    // Adds a random tile (2 or 4) to an empty cell
    addRandomTile() {
        const emptyCells = this.cells.map((cell, index) => ({ cell, index })).filter(item => item.cell.value === 0);
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const cellIndex = emptyCells[randomIndex].index;
            const value = Math.random() < 0.9 ? 2 : 4;
            this.cells[cellIndex] = { value, id: getUniqueId(), merged: false, isNew: true };
        }
    },

    // Resets flags on cells after a move
    prepareForNextMove() {
        this.cells.forEach(cell => {
            cell.merged = false;
            cell.isNew = false;
        });
    },

    // Main function to handle player input (up, down, left, right)
    respond(direction) {
        if (this.over) return false;
        this.prepareForNextMove();

        let moved = false;
        const traverse = (x, y) => ({ x, y });

        const vectors = {
            up: { x: 0, y: -1 },
            down: { x: 0, y: 1 },
            left: { x: -1, y: 0 },
            right: { x: 1, y: 0 }
        };

        const vector = vectors[direction];

        // Determine traversal order based on direction
        const xRange = direction === 'right' ? Array.from({ length: GRID_SIZE }, (_, i) => GRID_SIZE - 1 - i) : Array.from({ length: GRID_SIZE }, (_, i) => i);
        const yRange = direction === 'down' ? Array.from({ length: GRID_SIZE }, (_, i) => GRID_SIZE - 1 - i) : Array.from({ length: GRID_SIZE }, (_, i) => i);

        yRange.forEach(y => {
            xRange.forEach(x => {
                const currentPos = { x, y };
                const currentIndex = y * GRID_SIZE + x;
                const currentCell = this.cells[currentIndex];

                if (currentCell.value !== 0) {
                    let furthestPos = this.findFurthestPosition(currentPos, vector);
                    let nextPos = furthestPos.next;
                    let nextIndex = nextPos.y * GRID_SIZE + nextPos.x;
                    let nextCell = this.cells[nextIndex];

                    // Merge condition
                    if (nextCell && nextCell.value === currentCell.value && !nextCell.merged) {
                        const mergedValue = currentCell.value * 2;
                        this.cells[nextIndex] = { value: mergedValue, id: getUniqueId(), merged: true, isNew: false };
                        this.cells[currentIndex] = { value: 0, id: getUniqueId(), merged: false, isNew: false };
                        this.score += mergedValue;
                        this.trigger('addScore', mergedValue);
                        if (mergedValue === WINNING_TILE) this.won = true;
                        moved = true;
                    } else {
                        // Move condition
                        const furthestIndex = furthestPos.furthest.y * GRID_SIZE + furthestPos.furthest.x;
                        if (currentIndex !== furthestIndex) {
                            this.cells[furthestIndex] = { ...currentCell };
                            this.cells[currentIndex] = { value: 0, id: getUniqueId(), merged: false, isNew: false };
                            moved = true;
                        }
                    }
                }
            });
        });

        if (moved) {
            this.addRandomTile();
            if (!this.movesAvailable()) {
                this.over = true;
                this.trigger('over');
            }
            if (this.won) {
                this.trigger('won');
            }
        }
        return moved;
    },

    // Finds the furthest empty cell a tile can move to
    findFurthestPosition(position, vector) {
        let furthest = position;
        let next = { x: furthest.x + vector.x, y: furthest.y + vector.y };

        while (this.isWithinBounds(next) && this.isCellAvailable(next)) {
            furthest = next;
            next = { x: furthest.x + vector.x, y: furthest.y + vector.y };
        }

        return { furthest, next };
    },

    // Checks if a position is within the grid
    isWithinBounds({ x, y }) {
        return x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE;
    },

    // Checks if a cell is empty
    isCellAvailable({ x, y }) {
        const index = y * GRID_SIZE + x;
        return this.cells[index].value === 0;
    },

    // Checks if any moves are possible
    movesAvailable() {
        for (let i = 0; i < this.cells.length; i++) {
            if (this.cells[i].value === 0) return true; // Empty cells exist
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const currentVal = this.cells[i].value;

            // Check neighbors
            if (x > 0 && this.cells[i - 1].value === currentVal) return true;
            if (x < GRID_SIZE - 1 && this.cells[i + 1].value === currentVal) return true;
            if (y > 0 && this.cells[i - GRID_SIZE].value === currentVal) return true;
            if (y < GRID_SIZE - 1 && this.cells[i + GRID_SIZE].value === currentVal) return true;
        }
        return false; // No empty cells or possible merges
    },

    // Event handling for game state changes
    addCallback(event, callback) {
        if (!this.callbacks[event]) {
            this.callbacks[event] = [];
        }
        this.callbacks[event].push(callback);
    },

    removeCallback(event) {
        this.callbacks[event] = [];
    },

    trigger(event, data) {
        const callbacks = this.callbacks[event];
        if (callbacks) {
            callbacks.forEach(callback => callback(data));
        }
    }
};

// --- React Components ---

/**
 * Tile Component
 * Renders a single tile on the game board.
 * Its appearance (color, size, text) is determined by its value.
 */
const Tile = ({ value, isNew, merged }) => {
    const tileColorMap = {
        2: 'bg-gray-200 text-gray-700',
        4: 'bg-yellow-200 text-gray-700',
        8: 'bg-orange-400 text-white',
        16: 'bg-orange-500 text-white',
        32: 'bg-red-500 text-white',
        64: 'bg-red-600 text-white',
        128: 'bg-yellow-400 text-white',
        256: 'bg-yellow-500 text-white',
        512: 'bg-yellow-600 text-white',
        1024: 'bg-indigo-400 text-white',
        2048: 'bg-indigo-600 text-white',
    };
    const defaultColor = 'bg-gray-600 text-white';
    const colorClasses = tileColorMap[value] || defaultColor;

    const textSize = value > 1000 ? 'text-3xl' : value > 100 ? 'text-4xl' : 'text-5xl';
    
    // Animation classes
    const newTileAnimation = isNew ? 'animate-new-tile' : '';
    const mergedTileAnimation = merged ? 'animate-merged-tile' : '';

    return (
        <div className={`w-full h-full rounded-md flex items-center justify-center font-bold ${colorClasses} ${newTileAnimation} ${mergedTileAnimation}`}>
            {value !== 0 && <span className={textSize}>{value}</span>}
        </div>
    );
};

/**
 * Cells Component
 * Renders the grid of cells and the tiles within them.
 */
const Cells = ({ cells }) => {
    return (
        <div className="grid grid-cols-4 grid-rows-4 gap-4">
            {Array(GRID_SIZE * GRID_SIZE).fill().map((_, i) => (
                <div key={i} className="w-full h-full bg-gray-400/50 rounded-md aspect-square">
                    {/* The actual tile is positioned absolutely within this grid cell */}
                </div>
            ))}
            {cells.map((cell, i) => {
                if (cell.value === 0) return null;
                const x = i % GRID_SIZE;
                const y = Math.floor(i / GRID_SIZE);
                return (
                    <div
                        key={cell.id}
                        className="absolute transition-all duration-150 ease-in-out"
                        style={{
                            width: 'calc(25% - 0.75rem)', // 25% width minus gap
                            height: 'calc(25% - 0.75rem)', // 25% height minus gap
                            top: `calc(${y * 25}% + ${y * 0.25}rem)`,
                            left: `calc(${x * 25}% + ${x * 0.25}rem)`,
                            margin: '0.5rem'
                        }}
                    >
                        <Tile value={cell.value} isNew={cell.isNew} merged={cell.merged} />
                    </div>
                );
            })}
        </div>
    );
};


/**
 * Main Game Component
 * Manages the overall game state, user input (keyboard and touch), and renders the UI.
 */
const Game2048 = () => {
    const [gameState, setGameState] = useState({
        cells: [],
        score: 0,
        over: false,
        won: false,
    });
    const [addition, setAddition] = useState(0);
    const [touchStart, setTouchStart] = useState(null);

    // Function to refresh the React state from the game object
    const refreshGameState = useCallback(() => {
        setGameState({
            cells: [...game.cells],
            score: game.score,
            over: game.over,
            won: game.won,
        });
    }, []);

    // Initialize game on first render
    useEffect(() => {
        game.init();
        refreshGameState();
    }, [refreshGameState]);

    // Setup event listeners for keyboard and game events
    useEffect(() => {
        const handleKeydown = (event) => {
            const keyMap = {
                ArrowUp: 'up',
                ArrowDown: 'down',
                ArrowLeft: 'left',
                ArrowRight: 'right',
                w: 'up',
                s: 'down',
                a: 'left',
                d: 'right'
            };

            const direction = keyMap[event.key];
            if (direction && game.respond(direction)) {
                refreshGameState();
            }
        };

        document.addEventListener('keydown', handleKeydown);

        // Game state callbacks
        game.addCallback('over', () => setGameState(prev => ({ ...prev, over: true })));
        game.addCallback('won', () => setGameState(prev => ({ ...prev, won: true })));
        game.addCallback('addScore', (score) => {
            setAddition(score);
            setTimeout(() => setAddition(0), 600); // Hide after animation
        });

        return () => {
            document.removeEventListener('keydown', handleKeydown);
            game.removeCallback('over');
            game.removeCallback('won');
            game.removeCallback('addScore');
        };
    }, [refreshGameState]);

    // Touch event handlers for mobile
    const handleTouchStart = (e) => {
        setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    const handleTouchEnd = (e) => {
        if (!touchStart) return;

        const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
        const dx = touchEnd.x - touchStart.x;
        const dy = touchEnd.y - touchStart.y;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        let direction;
        if (Math.max(absDx, absDy) > 30) { // Swipe threshold
            if (absDx > absDy) {
                direction = dx > 0 ? 'right' : 'left';
            } else {
                direction = dy > 0 ? 'down' : 'up';
            }
        }

        if (direction && game.respond(direction)) {
            refreshGameState();
        }
        setTouchStart(null);
    };

    // Restart game function
    const restart = (event) => {
        event.preventDefault();
        game.init();
        refreshGameState();
        setAddition(0);
    };

    const { cells, score, over, won } = gameState;

    return (
        <div className="bg-[#faf8ef] min-h-screen flex flex-col items-center justify-center p-4 font-sans text-[#776e65]">
            <div className="w-full max-w-md mx-auto">
                {/* Header */}
                <header className="flex items-center justify-between mb-4">
                    <h1 className="text-6xl md:text-7xl font-bold">2048</h1>
                    <div className="flex items-center space-x-2">
                        <div className="relative bg-[#bbada0] text-white p-2 rounded-md text-center">
                            <div className="text-xs font-bold uppercase text-gray-200">Score</div>
                            <div className="text-2xl font-bold">{score}</div>
                            {addition !== 0 && (
                                <div className="score-addition absolute -top-6 right-0 text-lg font-bold text-orange-500">
                                    +{addition}
                                </div>
                            )}
                        </div>
                        <button
                            className="bg-[#8f7a66] text-white font-bold py-2 px-4 rounded-md hover:bg-[#9f8b77] transition-colors"
                            onClick={restart}
                        >
                            New Game
                        </button>
                    </div>
                </header>

                {/* Intro Text */}
                <div className="flex justify-between items-center mb-4">
                    <p className="text-base">
                        Join the numbers and get to the <b>2048 tile!</b>
                    </p>
                </div>

                {/* Game Container */}
                <div
                    className="relative bg-[#bbada0] p-4 rounded-lg touch-none"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Game Over/Win Message */}
                    {(won || over) && (
                        <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center rounded-lg animate-fade-in ${won ? 'bg-yellow-400/80' : 'bg-gray-200/80'}`}>
                            <p className="text-6xl font-bold">{won ? 'You Win!' : 'Game Over!'}</p>
                            <button
                                className="mt-8 bg-[#8f7a66] text-white font-bold py-2 px-6 rounded-md text-xl hover:bg-[#9f8b77] transition-colors"
                                onClick={restart}
                            >
                                Try Again
                            </button>
                        </div>
                    )}
                    <Cells cells={cells} />
                </div>

                {/* How to Play */}
                <footer className="mt-4 text-center">
                    <p>
                        <b>How to play:</b> Use your <b>arrow keys</b> or <b>swipe</b> to move the tiles. When two tiles with the same number touch, they <b>merge into one!</b>
                    </p>
                </footer>
            </div>
            
            {/* Custom CSS for animations */}
            <style>{`
                @keyframes new-tile {
                    0% { transform: scale(0); }
                    100% { transform: scale(1); }
                }
                .animate-new-tile {
                    animation: new-tile 0.2s ease-in-out;
                }

                @keyframes merged-tile {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
                .animate-merged-tile {
                    animation: merged-tile 0.2s ease-in-out;
                }

                @keyframes fade-in {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-in-out 0.5s;
                    animation-fill-mode: both;
                }
                
                @keyframes move-up {
                    0% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(-30px); }
                }
                .score-addition {
                    animation: move-up 0.6s ease-in;
                }
            `}</style>
        </div>
    );
};

export default Game2048;
