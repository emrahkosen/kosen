import React from 'react';
import { Link } from 'react-router-dom';

const games = [
  {
    id: 'tic-tac-toe',
    title: 'Tic-Tac-Toe',
    description: 'The classic game of Xs and Os. Challenge a friend or the computer.',
    imageUrl: 'https://placehold.co/600x400/2d3748/ffffff?text=Tic-Tac-Toe'
  },
  {
    id: 'chess',
    title: 'Chess',
    description: 'The ultimate game of strategy. Plan your moves and checkmate the king.',
    imageUrl: 'https://placehold.co/600x400/4a5568/ffffff?text=Chess'
  },
  {
    id: 'sudoku',
    title: 'Sudoku',
    description: 'A logic-based number-placement puzzle. Fill the 9x9 grid.',
    imageUrl: 'https://placehold.co/600x400/718096/ffffff?text=Sudoku'
  }
];

// A single game card component
const GameCard = ({ game }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img 
        src={game.imageUrl} 
        alt={game.title} 
        className="w-full h-48 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/cccccc/ffffff?text=Image+Error'; }}
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{game.title}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{game.description}</p>
        <Link
          to={`/games/${game.id}`}
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Play Now
        </Link>
      </div>
    </div>
  );
};

// The main component for the games homepage
const GameHomePage = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-4">
          Game Zone
        </h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-12">
          Choose a game from our collection and start playing!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameHomePage;