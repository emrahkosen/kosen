import React, { useState, useEffect } from 'react';

import game from './Game';
import './2048.css';
import Cells from './Cells';

const Game2048 = () => {
  const [cells, setCells] = useState(game.cells);
  const [addition, setAddition] = useState(0);
  const [score, setScore] = useState(0);
  const [over, setOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    const handleKeydown = (event) => {
      const keyMap = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right'
      };

      if (game.respond(keyMap[event.code])) {
        refreshGameState();
      }
    };

    document.addEventListener('keydown', handleKeydown);

    game.addCallback('over', () => {
      setOver(true);
    });

    game.addCallback('won', () => {
      setWon(true);
    });

    game.addCallback('addScore', (score) => {
      setAddition(score);
    });

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      game.removeCallback('over');
      game.removeCallback('won');
      game.removeCallback('addScore');
    };
  }, []);

  const restart = (event) => {
    event.preventDefault();
    game.restart();
    setCells(game.cells);
    setAddition(0);
    setScore(0);
    setOver(false);
    setWon(false);
  };

  const refreshGameState = () => {
    setCells(game.cells);
    setScore(game.score);
    setOver(game.over);
    setWon(game.won);
  };

  return (
    <div className="app">
      <div className="game-header">
        <h1 className="title">2048</h1>
        <div className="score-container">
          {score}

          {addition !== 0 && <div className="score-addition">+{addition}</div>}
        </div>
      </div>

      <div className="game-intro">
        <button className="restart-button" onClick={restart}>New Game</button>
        <h2 className="subtitle">Play 2048 Game</h2>
        Join the numbers and get to the <b>2048 tile!</b>
      </div>

      <div className="game-container">
        {(won || over) &&
          <div className={`game-message game-${(won && 'won') || (over && 'over')}`}>
            <p>{won ? 'You win!' : 'Game over!'}</p>

            <div className='actions'>
              <button className='retry-button' onClick={restart}>Try again</button>
            </div>
          </div>
        }
        <Cells cells={cells} />
        
      </div>

      <p className="game-explanation">
        <b className="important">How to play: </b>
        Use your <b>arrow keys</b> to move the tiles. When two tiles with the same number touch, they <b>merge into one!</b>
      </p>
    </div>
  );
};

export default Game2048;
