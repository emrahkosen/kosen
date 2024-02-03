import React, { useState } from 'react';

function Game2048() {
  const [board, setBoard] = useState(Array(4).fill(null).map(() => Array(4).fill(null)));

  const addRandomTile = () => {
    const emptyTiles = board.flat().filter(tile => tile === null);
    const emptyTileIndex = Math.floor(Math.random() * emptyTiles.length);
    const newTileValue = Math.floor(Math.random() * 10); // Değiştirebilirsiniz

    setBoard(prevState =>
      prevState.map((row, i) =>
        row.map((tile, j) => (i === emptyTileIndex && j === emptyTileIndex ? newTileValue : tile))
      )
    );
  };

  return (
    <div>
      <Board board={board} addTile={addRandomTile} />
    </div>
  );
}

function Board({ board, addTile }) {
    return (
      <div className="board">
        {board.map((row, i) => (
          <div key={i} className="row">
            {row.map((tile, j) => (
              <Tile key={j} tile={tile} onClick={() => addTile(i, j)} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  function Tile({ tile }) {
    return (
      <div className={"tile " + (tile === null ? "empty" : tile)}>{tile}</div>
    );
  }
export default Game2048;