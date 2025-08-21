import React, { useState, useEffect, useCallback, useRef } from 'react';

// Şeker renkleri için HEX kodları (Tailwind sınıfları yerine)
const candyColors = [
  '#ef4444', // Kırmızı
  '#22c55e', // Yeşil
  '#3b82f6', // Mavi
  '#eab308', // Sarı
  '#a855f7', // Mor
  '#ec4899', // Pembe
];

const candyEmojis = ['🍒', '🍋', '🍇', '🍊', '🍓', '🍎']; // Şeker emojileri

const boardSize = 8; // Oyun tahtası boyutu (8x8)

// Helper: Rastgele bir şeker türü döndürür
const getRandomCandy = () => {
  return Math.floor(Math.random() * candyColors.length);
};

// Hover efektlerini yönetmek için özel Düğme bileşeni
const CustomButton = ({ onClick, children, style, hoverStyle }) => {
  const [isHovered, setIsHovered] = useState(false);

  const combinedStyle = {
    ...style,
    ...(isHovered ? hoverStyle : {}),
    cursor: 'pointer',
    transition: 'all 0.3s ease-out',
  };

  return (
    <button
      onClick={onClick}
      style={combinedStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};


function CandyCrush() {
  const [board, setBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [draggedCandy, setDraggedCandy] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fallingCandies, setFallingCandies] = useState({});
  const [poppingCandies, setPoppingCandies] = useState({});

  const gridRef = useRef(null);

  // Eşleşmeleri kontrol etme
  const checkMatches = useCallback((currentBoard) => {
    const matches = new Set();
    // Yatay eşleşmeler
    for (let r = 0; r < boardSize; r++) {
      for (let c = 0; c < boardSize - 2; c++) {
        const candy1 = currentBoard[r][c];
        const candy2 = currentBoard[r][c + 1];
        const candy3 = currentBoard[r][c + 2];
        if (candy1 !== null && candy1 === candy2 && candy2 === candy3) {
          matches.add(`${r}-${c}`);
          matches.add(`${r}-${c + 1}`);
          matches.add(`${r}-${c + 2}`);
        }
      }
    }
    // Dikey eşleşmeler
    for (let c = 0; c < boardSize; c++) {
      for (let r = 0; r < boardSize - 2; r++) {
        const candy1 = currentBoard[r][c];
        const candy2 = currentBoard[r + 1][c];
        const candy3 = currentBoard[r + 2][c];
        if (candy1 !== null && candy1 === candy2 && candy2 === candy3) {
          matches.add(`${r}-${c}`);
          matches.add(`${r + 1}-${c}`);
          matches.add(`${r + 2}-${c}`);
        }
      }
    }
    return Array.from(matches).map(coord => coord.split('-').map(Number));
  }, []);

  // Tahtayı oluşturma
  const createBoard = useCallback(() => {
    let initialBoard = [];
    for (let i = 0; i < boardSize; i++) {
      let row = [];
      for (let j = 0; j < boardSize; j++) {
        row.push(getRandomCandy());
      }
      initialBoard.push(row);
    }
    // Başlangıçta eşleşme olmamasını sağla
    for (let i = 0; i < 10; i++) {
      if (checkMatches(initialBoard).length === 0) break;
      initialBoard = initialBoard.map(row => row.map(() => getRandomCandy()));
    }

    setBoard(initialBoard);
    setScore(0);
    setFallingCandies({});
    setPoppingCandies({});
    setIsProcessing(false);
  }, [checkMatches]);

  // Eşleşmeleri temizleme
  const clearMatches = useCallback((matchedCoords) => {
    const newPoppingCandies = {};
    matchedCoords.forEach(([r, c]) => {
      newPoppingCandies[`${r}-${c}`] = true;
    });
    setPoppingCandies(newPoppingCandies);
    setScore(prev => prev + matchedCoords.length * 10);
  }, []);

  // Şekerleri düşürme
  const dropCandies = useCallback((currentBoard) => {
    let newBoard = [...currentBoard.map(row => [...row])];
    const newFallingCandies = {};
    for (let c = 0; c < boardSize; c++) {
      const emptyCells = [];
      for (let r = boardSize - 1; r >= 0; r--) {
        if (newBoard[r][c] === null) {
          emptyCells.push(r);
        } else if (emptyCells.length > 0) {
          const targetRow = emptyCells.shift();
          newBoard[targetRow][c] = newBoard[r][c];
          newBoard[r][c] = null;
          emptyCells.push(r);
          newFallingCandies[`${targetRow}-${c}`] = true;
        }
      }
      emptyCells.forEach(r => {
        newBoard[r][c] = getRandomCandy();
        newFallingCandies[`${r}-${c}`] = true;
      });
    }
    setFallingCandies(newFallingCandies);
    return newBoard;
  }, []);

  // Zincirleme eşleşmeleri işleme
  const processMatchesCascade = useCallback(async (initialBoardState) => {
    setIsProcessing(true);
    let currentProcessingBoard = initialBoardState;
    while (true) {
      const matched = checkMatches(currentProcessingBoard);
      if (matched.length === 0) break;

      clearMatches(matched);
      await new Promise(resolve => setTimeout(resolve, 350));

      let boardAfterNull = [...currentProcessingBoard.map(row => [...row])];
      matched.forEach(([r, c]) => { boardAfterNull[r][c] = null; });
      setPoppingCandies({});
      
      const boardAfterDrop = dropCandies(boardAfterNull);
      setBoard(boardAfterDrop);
      await new Promise(resolve => setTimeout(resolve, 350));
      
      currentProcessingBoard = boardAfterDrop;
    }
    setFallingCandies({});
    setIsProcessing(false);
  }, [checkMatches, clearMatches, dropCandies]);

  // Şeker değiştirme denemesi
  const attemptSwap = useCallback(async (firstCandyCoords, secondCandyCoords) => {
    if (!firstCandyCoords || !secondCandyCoords || isProcessing) return;

    const [r1, c1] = firstCandyCoords;
    const [r2, c2] = secondCandyCoords;

    if (r1 === r2 && c1 === c2) return;

    const isAdjacent = Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;
    if (!isAdjacent) {
      setDraggedCandy(null);
      return;
    }

    setIsProcessing(true);
    const originalBoard = [...board.map(r => [...r])];
    let tempBoard = [...board.map(r => [...r])];
    [tempBoard[r1][c1], tempBoard[r2][c2]] = [tempBoard[r2][c2], tempBoard[r1][c1]];
    setBoard(tempBoard);

    await new Promise(resolve => setTimeout(resolve, 300));

    if (checkMatches(tempBoard).length === 0) {
      setBoard(originalBoard);
      await new Promise(resolve => setTimeout(resolve, 300));
      setIsProcessing(false);
    } else {
      await processMatchesCascade(tempBoard);
    }
    setDraggedCandy(null);
  }, [board, isProcessing, checkMatches, processMatchesCascade]);

  // Sürükle-bırak ve dokunmatik olay yöneticileri
  const handleDragStart = useCallback((e, r, c) => {
    if (isProcessing) { e.preventDefault(); return; }
    setDraggedCandy([r, c]);
    e.dataTransfer.setData("text/plain", "");
  }, [isProcessing]);

  const handleDragOver = useCallback((e) => e.preventDefault(), []);

  const handleDrop = useCallback((e, r, c) => {
    e.preventDefault();
    if (isProcessing || !draggedCandy) return;
    attemptSwap(draggedCandy, [r, c]);
  }, [draggedCandy, isProcessing, attemptSwap]);

  const handleTouchStart = useCallback((e, r, c) => {
    if (isProcessing) return;
    setDraggedCandy([r, c]);
  }, [isProcessing]);

  const handleTouchEnd = useCallback((e) => {
    if (isProcessing || !draggedCandy) return;
    const touch = e.changedTouches[0];
    if (!touch) { setDraggedCandy(null); return; }
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (target && target.dataset.row && target.dataset.col) {
      attemptSwap(draggedCandy, [parseInt(target.dataset.row), parseInt(target.dataset.col)]);
    } else {
      setDraggedCandy(null);
    }
  }, [draggedCandy, isProcessing, attemptSwap]);

  useEffect(() => {
    createBoard();
  }, [createBoard]);

  return (
    <div style={styles.appContainer}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap" rel="stylesheet" />
      <style>{`
        /* Global stiller ve animasyonlar */
        body { font-family: 'Inter', sans-serif; margin: 0; touch-action: pan-y; }
        @keyframes pop-out {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.5; }
          100% { transform: scale(0); opacity: 0; }
        }
        @keyframes fall-in {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        /* Medya sorgusu ile başlık ve skor kutusunu dikey hizalama */
        @media (max-width: 480px) {
            .header-container {
                flex-direction: column;
                align-items: center;
                gap: 16px;
            }
        }
      `}</style>

      <div className="header-container" style={styles.header}>
        <h1 style={styles.title}>Şeker Ezmece</h1>
        <div style={styles.scoreBox}>
          <p style={styles.scoreText}>Puan: <span style={styles.scoreNumber}>{score}</span></p>
        </div>
      </div>

      <div style={styles.gridContainer} ref={gridRef}>
        {board.map((row, r) =>
          row.map((candyType, c) => {
            const isDragged = draggedCandy && draggedCandy[0] === r && draggedCandy[1] === c;
            const isPopping = poppingCandies[`${r}-${c}`];
            const isFalling = fallingCandies[`${r}-${c}`];
            
            const cellStyle = {
              ...styles.candyCell,
              backgroundColor: candyType !== null ? candyColors[candyType] : 'transparent',
              ...(isDragged && styles.draggedCell),
              ...(isPopping && { animation: 'pop-out 0.4s ease-out forwards' }),
              ...(candyType === null && styles.hiddenCell),
            };

            return (
              <div
                key={`${r}-${c}`}
                style={cellStyle}
                draggable={!isProcessing}
                onDragStart={(e) => handleDragStart(e, r, c)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, r, c)}
                onTouchStart={(e) => handleTouchStart(e, r, c)}
                onTouchEnd={handleTouchEnd}
                data-row={r}
                data-col={c}
              >
                {candyType !== null && (
                  <span style={{ ...styles.emoji, ...(isFalling && { animation: 'fall-in 0.4s ease-out' }) }}>
                    {candyEmojis[candyType]}
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>

      <CustomButton
        onClick={createBoard}
        style={styles.button}
        hoverStyle={styles.buttonHover}
      >
        Yeni Oyun
      </CustomButton>
    </div>
  );
}

// Tüm stiller tek bir obje içinde toplanmıştır
const styles = {
  appContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #4f46e5, #a855f7)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    boxSizing: 'border-box',
  },
  header: {
    width: '100%',
    maxWidth: '500px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: 'clamp(2.5rem, 8vw, 3.2rem)',
    fontWeight: '800',
    color: 'white',
    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
    margin: 0,
  },
  scoreBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(5px)',
    borderRadius: '12px',
    padding: '12px 24px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  },
  scoreText: {
    margin: 0,
    fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
    fontWeight: '600',
    color: 'white',
  },
  scoreNumber: {
    color: '#fde047', // yellow-300
    fontWeight: 'bold',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
    gridTemplateRows: `repeat(${boardSize}, 1fr)`,
    width: '90vmin', // Ekranın genişlik veya yüksekliğinin %90'ı (hangisi daha küçükse)
    height: '90vmin',
    maxWidth: '450px', // Maksimum boyut
    maxHeight: '450px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    border: '2px solid rgba(255,255,255,0.2)',
    // YENİ EKLENEN STİLLER
    gap: '4px', // Kareler arasına boşluk ekler
    padding: '4px', // Tahtanın kenarlarına iç boşluk ekler
    boxSizing: 'border-box', // Padding'in toplam boyutu etkilememesini sağlar
  },
  candyCell: {
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // border kaldırıldı
    cursor: 'grab',
    transition: 'transform 0.2s ease-out, box-shadow 0.2s ease-out',
    borderRadius: '8px',
  },
  emoji: {
    fontSize: 'clamp(1.2rem, 5vmin, 2.2rem)', // Font boyutu da vmin ile ölçeklenir
    lineHeight: 1,
    pointerEvents: 'none', // Sürükleme olaylarının dive gitmesini sağlar
  },
  draggedCell: {
    opacity: 0.5,
    transform: 'scale(0.9)',
    cursor: 'grabbing',
    zIndex: 10,
    border: '3px dashed white',
  },
  hiddenCell: {
    opacity: 0,
    transform: 'scale(0)',
    transition: 'opacity 0.2s, transform 0.2s',
  },
  button: {
    marginTop: '32px',
    padding: '12px 32px',
    background: 'linear-gradient(to right, #2dd4bf, #22d3ee)',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '9999px',
    border: 'none',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
  },
  buttonHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
  },
};




export default CandyCrush;