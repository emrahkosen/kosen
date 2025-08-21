import React, { useState, useEffect, useCallback, useRef } from 'react';

// Oyun sabitleri
const GAME_DURATION = 30; // saniye
const TARGET_SPAWN_RATE = 600; // milisaniye
const TARGET_LIFESPAN = 1500; // milisaniye

// Stil nesneleri (CSS-in-JS). Bu, bileşene özgü stiller için kullanılır.
const styles = {
    gameContainer: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#111827',
        fontFamily: "'Nunito', sans-serif",
        userSelect: 'none',
    },
    header: {
        flexShrink: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem',
    },
    infoText: {
        fontSize: '1rem',
        color: '#9CA3AF',
    },
    valueText: {
        fontSize: '2.25rem',
        fontWeight: '900',
        color: '#FFFFFF',
    },
    gameArea: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: '#1F2937',
        position: 'relative',
        cursor: 'crosshair',
    },
    modalOverlay: {
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
    },
    modalContent: {
        textAlign: 'center',
        color: 'white',
        padding: '2rem',
        borderRadius: '0.5rem',
        animation: 'fadeIn 0.3s ease-out',
    },
    modalTitle: {
        fontSize: '3rem',
        fontWeight: '900',
        marginBottom: '1rem',
    },
    modalText: {
        fontSize: '1.25rem',
        color: '#D1D5DB',
        marginBottom: '2rem',
    },
    finalScoreLabel: {
        fontSize: '1.5rem',
        marginBottom: '1rem',
    },
    finalScore: {
        fontSize: '5rem',
        fontWeight: '900',
        marginBottom: '2rem',
    },
    button: {
        backgroundColor: '#4F46E5',
        color: 'white',
        fontWeight: 'bold',
        padding: '1rem 3rem',
        borderRadius: '9999px',
        fontSize: '1.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease, background-color 0.2s ease',
        border: 'none',
        cursor: 'pointer',
    }
};

// Ana Oyun Bileşeni
const Game = () => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [gameState, setGameState] = useState('waiting'); // 'waiting', 'playing', 'gameOver'
    const [targets, setTargets] = useState([]);
    const gameAreaRef = useRef(null);

    const updateTimer = useCallback(() => {
        setTimeLeft(prev => {
            if (prev <= 1) {
                setGameState('gameOver');
                return 0;
            }
            return prev - 1;
        });
    }, []);

    const spawnTarget = useCallback(() => {
        if (!gameAreaRef.current) return;
        const gameArea = gameAreaRef.current;
        const size = Math.random() * 40 + 40;
        const newTarget = {
            id: Date.now(),
            isGood: Math.random() > 0.25,
            size,
            x: Math.random() * (gameArea.clientWidth - size),
            y: Math.random() * (gameArea.clientHeight - size),
        };
        setTargets(prev => [...prev, newTarget]);
        setTimeout(() => {
            setTargets(prev => prev.filter(t => t.id !== newTarget.id));
        }, TARGET_LIFESPAN);
    }, []);

    useEffect(() => {
        if (gameState !== 'playing') return;
        const timerInterval = setInterval(updateTimer, 1000);
        const targetInterval = setInterval(spawnTarget, TARGET_SPAWN_RATE);
        return () => {
            clearInterval(timerInterval);
            clearInterval(targetInterval);
        };
    }, [gameState, updateTimer, spawnTarget]);

    useEffect(() => {
        if (gameState === 'gameOver') {
            setTargets([]);
        }
    }, [gameState]);

    const startGame = () => {
        setScore(0);
        setTimeLeft(GAME_DURATION);
        setTargets([]);
        setGameState('playing');
    };

    const handleTargetClick = (targetId, isGood) => {
        setScore(prev => prev + (isGood ? 1 : Math.max(0, prev - 2)));
        setTargets(prev => prev.filter(t => t.id !== targetId));
    };

    const handleMiss = (e) => {
        if (e.target === gameAreaRef.current) {
            setScore(prev => Math.max(0, prev - 1));
        }
    };

    return (
        <div style={styles.gameContainer}>
            <div style={styles.header}>
                <div>
                    <span style={styles.infoText}>SKOR</span>
                    <p style={styles.valueText}>{score}</p>
                </div>
                <div>
                    <span style={styles.infoText}>SÜRE</span>
                    <p style={styles.valueText}>{timeLeft}</p>
                </div>
            </div>

            <div
                ref={gameAreaRef}
                style={styles.gameArea}
                onClick={gameState === 'playing' ? handleMiss : null}
            >
                {targets.map(target => (
                    <Target key={target.id} data={target} onClick={handleTargetClick} />
                ))}
            </div>

            {gameState !== 'playing' && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h2 style={styles.modalTitle}>
                            {gameState === 'waiting' ? 'Reflex Rush' : 'Oyun Bitti'}
                        </h2>
                        <p style={styles.modalText}>
                            {gameState === 'waiting' ? 'Yeşil dairelere dokun, kırmızılardan kaçın!' : ''}
                        </p>
                        {gameState === 'gameOver' && (
                            <React.Fragment>
                                <p style={styles.finalScoreLabel}>Nihai Skorun:</p>
                                <p style={styles.finalScore}>{score}</p>
                            </React.Fragment>
                        )}
                        <button 
                            style={styles.button}
                            onClick={startGame}
                            onMouseOver={e => e.currentTarget.style.backgroundColor = '#4338CA'}
                            onMouseOut={e => e.currentTarget.style.backgroundColor = '#4F46E5'}
                        >
                            {gameState === 'waiting' ? 'BAŞLA' : 'TEKRAR OYNA'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Hedef Bileşeni
const Target = ({ data, onClick }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const baseStyle = {
        position: 'absolute',
        borderRadius: '50%',
        transition: 'all 0.1s ease-out',
        width: `${data.size}px`,
        height: `${data.size}px`,
        left: `${data.x}px`,
        top: `${data.y}px`,
    };

    const typeStyle = {
        backgroundColor: data.isGood ? '#22C55E' : '#EF4444',
    };

    const visibilityStyle = {
        transform: isVisible ? 'scale(1)' : 'scale(0)',
        opacity: isVisible ? 1 : 0,
    };

    const combinedStyle = { ...baseStyle, ...typeStyle, ...visibilityStyle };

    return (
        <div
            style={combinedStyle}
            onClick={(e) => {
                e.stopPropagation();
                onClick(data.id, data.isGood);
            }}
            onTouchStart={(e) => {
                e.stopPropagation();
                onClick(data.id, data.isGood);
            }}
        ></div>
    );
};




export default function ReflexRush() {
  return <Game />;
}