import React, { useState, useEffect, useCallback, useRef } from 'react';

// Helper function to initialize the game board with two random tiles
const initialBoard = () => {
  const board = Array(4).fill(0).map(() => Array(4).fill(0));
  addRandomTile(board);
  addRandomTile(board);
  return board;
};

// Helper function to add a random tile (2 or 4) to an empty cell on the board
const addRandomTile = (board) => {
  const emptyCells = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c] === 0) {
        emptyCells.push({ r, c });
      }
    }
  }

  if (emptyCells.length > 0) {
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomCell.r][randomCell.c] = Math.random() < 0.9 ? 2 : 4; // 90% chance of 2, 10% chance of 4
    return true;
  }
  return false;
};

// Helper function to slide and merge tiles in a single row or column
const operateLine = (line) => {
  let scoreGained = 0;
  let newArr = line.filter(val => val !== 0);

  for (let i = 0; i < newArr.length - 1; i++) {
    if (newArr[i] === newArr[i + 1]) {
      newArr[i] *= 2;
      scoreGained += newArr[i];
      newArr.splice(i + 1, 1);
    }
  }

  while (newArr.length < 4) {
    newArr.push(0);
  }
  return { newLine: newArr, scoreGained };
};

// Helper to check if two boards are identical
const boardsEqual = (board1, board2) => {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (board1[r][c] !== board2[r][c]) {
        return false;
      }
    }
  }
  return true;
};

// Helper to check for game over condition
const checkGameOver = (board) => {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c] === 0) return false;
    }
  }
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[r][c] === board[r][c + 1]) return false;
    }
  }
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 3; r++) {
      if (board[r][c] === board[r + 1][c]) return false;
    }
  }
  return true;
};

// Helper to check for win condition
const checkWin = (board) => {
  return board.flat().includes(2048);
};

// --- STYLES ---
// We are including CSS directly here for a self-contained component.
// In a larger project, this would typically be in a separate .css file.
const GameStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap');

    :root {
      --board-bg: #bbada0;
      --grid-bg: #cdc1b4;
      --text-dark: #776e65;
      --text-light: #f9f6f2;
      --bg-2: #eee4da;
      --bg-4: #ede0c8;
      --bg-8: #f2b179;
      --bg-16: #f59563;
      --bg-32: #f67c5f;
      --bg-64: #f65e3b;
      --bg-128: #edcf72;
      --bg-256: #edcc61;
      --bg-512: #edc850;
      --bg-1024: #edc53f;
      --bg-2048: #edc22e;
      --bg-default: #3c3a32;
    }

    .game-container {
      font-family: 'Inter', sans-serif;
      background-color: #faf8ef;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 16px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .game-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 500px;
      margin-bottom: 24px;
    }

    .game-title {
      font-size: 3rem;
      font-weight: 800;
      color: var(--text-dark);
    }

    .score-container {
      background-color: var(--board-bg);
      color: white;
      padding: 8px 16px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 1.25rem;
      text-align: center;
    }
    
    .score-container span {
        display: block;
        font-size: 0.8rem;
        color: #eee4da;
    }

    .game-board {
      position: relative;
      background-color: var(--board-bg);
      border-radius: 8px;
      padding: 8px;
      width: 100%;
      max-width: 500px;
      aspect-ratio: 1 / 1;
      touch-action: none;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(4, 1fr);
      gap: 8px;
    }

    .grid-cell {
      background-color: var(--grid-bg);
      border-radius: 6px;
    }
    
    .tile-container {
        position: absolute;
        top: 8px;
        left: 8px;
        right: 8px;
        bottom: 8px;
    }

    .tile {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      font-weight: 700;
      transition: all 100ms ease-in-out;
      position: absolute;
    }
    
    .tile.tile-0 {
        display: none;
    }
    
    .tile.tile-2 { background-color: var(--bg-2); color: var(--text-dark); }
    .tile.tile-4 { background-color: var(--bg-4); color: var(--text-dark); }
    .tile.tile-8 { background-color: var(--bg-8); color: var(--text-light); }
    .tile.tile-16 { background-color: var(--bg-16); color: var(--text-light); }
    .tile.tile-32 { background-color: var(--bg-32); color: var(--text-light); }
    .tile.tile-64 { background-color: var(--bg-64); color: var(--text-light); }
    .tile.tile-128 { background-color: var(--bg-128); color: var(--text-light); }
    .tile.tile-256 { background-color: var(--bg-256); color: var(--text-light); }
    .tile.tile-512 { background-color: var(--bg-512); color: var(--text-light); }
    .tile.tile-1024 { background-color: var(--bg-1024); color: var(--text-light); }
    .tile.tile-2048 { background-color: var(--bg-2048); color: var(--text-light); }
    .tile.tile-default { background-color: var(--bg-default); color: var(--text-light); }

    /* Font size adjustments */
    .tile.fs-small { font-size: 2rem; }
    .tile.fs-medium { font-size: 2.5rem; }
    .tile.fs-large { font-size: 3rem; }

    .game-overlay {
      position: absolute;
      inset: 0;
      background-color: rgba(238, 228, 218, 0.73);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      z-index: 10;
      text-align: center;
    }

    .overlay-title {
      font-size: 3rem;
      font-weight: 800;
      color: var(--text-dark);
      margin-bottom: 16px;
    }

    .reset-button {
      background-color: #8f7a66;
      color: white;
      font-weight: 700;
      padding: 12px 24px;
      border: none;
      border-radius: 9999px;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 1.1rem;
    }
    
    .reset-button:hover {
        background-color: #776e65;
        transform: scale(1.05);
    }
    
    .main-reset-button {
        margin-top: 32px;
    }

    .instructions {
      margin-top: 32px;
      text-align: center;
      color: var(--text-dark);
      max-width: 500px;
    }
    
    .instructions p {
        margin-bottom: 8px;
    }

    /* Responsive Design */
    @media (max-width: 520px) {
      .game-title { font-size: 2rem; }
      .score-container { font-size: 1rem; padding: 6px 12px; }
      .overlay-title { font-size: 2rem; }
      .tile.fs-small { font-size: 1.5rem; }
      .tile.fs-medium { font-size: 2rem; }
      .tile.fs-large { font-size: 2.5rem; }
    }
  `}</style>
);

// Component for a single tile
const Tile = ({ value, r, c }) => {
  const getFontSizeClass = (val) => {
    if (val >= 1024) return 'fs-small';
    if (val >= 128) return 'fs-medium';
    return 'fs-large';
  };
  
  const tileClass = `tile tile-${value > 2048 ? 'default' : value} ${getFontSizeClass(value)}`;
  
  const tileStyle = {
      transform: `translate(calc(${c} * (100% + 8px)), calc(${r} * (100% + 8px)))`,
      width: 'calc((100% - 24px) / 4)',
      height: 'calc((100% - 24px) / 4)',
  };

  return (
    <div className={tileClass} style={tileStyle}>
      {value !== 0 ? value : ''}
    </div>
  );
};

// Main App Component
const Game2048 = () => {
  const [board, setBoard] = useState(initialBoard());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const touchEndY = useRef(0);

  const handleMove = useCallback((direction) => {
    if (gameOver) return;

    const oldBoard = JSON.parse(JSON.stringify(board));
    const newBoard = JSON.parse(JSON.stringify(board));
    let currentScore = 0;

    if (direction === 'left' || direction === 'right') {
      for (let r = 0; r < 4; r++) {
        let line = newBoard[r];
        if (direction === 'right') line.reverse();
        const { newLine, scoreGained } = operateLine(line);
        if (direction === 'right') newLine.reverse();
        newBoard[r] = newLine;
        currentScore += scoreGained;
      }
    } else { // 'up' or 'down'
      for (let c = 0; c < 4; c++) {
        let line = [];
        for (let r = 0; r < 4; r++) line.push(newBoard[r][c]);
        if (direction === 'down') line.reverse();
        const { newLine, scoreGained } = operateLine(line);
        if (direction === 'down') newLine.reverse();
        for (let r = 0; r < 4; r++) newBoard[r][c] = newLine[r];
        currentScore += scoreGained;
      }
    }

    if (!boardsEqual(oldBoard, newBoard)) {
      addRandomTile(newBoard);
      setBoard(newBoard);
      setScore(prev => prev + currentScore);
    }
  }, [board, gameOver]);

  // Keyboard and Touch Controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameWon || gameOver) return;
      const keyMap = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
      if (keyMap[e.key]) {
        e.preventDefault();
        handleMove(keyMap[e.key]);
      }
    };

    const gameBoardElement = document.getElementById('game-board-touch-target');
    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e) => {
      if (gameWon || gameOver) return;
      touchEndX.current = e.changedTouches[0].clientX;
      touchEndY.current = e.changedTouches[0].clientY;
      handleSwipe();
    };
    const handleSwipe = () => {
      const dx = touchEndX.current - touchStartX.current;
      const dy = touchEndY.current - touchStartY.current;
      if (Math.abs(dx) < 50 && Math.abs(dy) < 50) return;

      if (Math.abs(dx) > Math.abs(dy)) {
        handleMove(dx > 0 ? 'right' : 'left');
      } else {
        handleMove(dy > 0 ? 'down' : 'up');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (gameBoardElement) {
      gameBoardElement.addEventListener('touchstart', handleTouchStart);
      gameBoardElement.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (gameBoardElement) {
        gameBoardElement.removeEventListener('touchstart', handleTouchStart);
        gameBoardElement.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [handleMove, gameWon, gameOver]);

  // Check game state
  useEffect(() => {
    if (!gameWon && checkWin(board)) {
      setGameWon(true);
    }
    if (!gameWon && checkGameOver(board)) {
      setGameOver(true);
    }
  }, [board, gameWon]);

  const resetGame = () => {
    setBoard(initialBoard());
    setScore(0);
    setGameOver(false);
    setGameWon(false);
  };

  return (
    <>
      <GameStyles />
      <div className="game-container">
        <div className="game-header">
          <h1 className="game-title">2048</h1>
          <div className="score-container">
            <span>SCORE</span>
            {score}
          </div>
        </div>

        <div id="game-board-touch-target" className="game-board">
          {Array(16).fill(0).map((_, i) => <div key={i} className="grid-cell" />)}
          
          <div className="tile-container">
            {board.map((row, r) =>
              row.map((value, c) => (value !== 0 ? <Tile key={`${r}-${c}`} value={value} r={r} c={c} /> : null))
            )}
          </div>

          {(gameOver || gameWon) && (
            <div className="game-overlay">
              <h2 className="overlay-title">{gameWon ? 'You Win!' : 'Game Over!'}</h2>
              <button onClick={resetGame} className="reset-button">
                Play Again
              </button>
            </div>
          )}
        </div>

        <button onClick={resetGame} className="reset-button main-reset-button">
          New Game
        </button>

        <div className="instructions">
          <p><b>How to play:</b> Use your <b>arrow keys</b> or <b>swipe</b> to move the tiles.</p>
          <p>Tiles with the same number merge into one when they touch. Get to the <b>2048</b> tile!</p>
        </div>
      </div>
    </>
  );
};



export default Game2048;