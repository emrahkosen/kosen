import React from 'react';
import Cell from './Cell';
import './Cells.css';



const Cells = ({ cells }) => {
  
  const cellGroups = () => {
    const groups = [];

    cells.forEach((value, index) => {
      const groupIndex = Math.floor(index / 4);
      groups[groupIndex] = groups[groupIndex] || [];
      groups[groupIndex].push(value);
    });

    return groups;
  };

  return (
    <div className="cells">
      {cellGroups().map((cells, groupIndex) => (
        <div key={groupIndex} className="cells-row">
          {cells.map((cell, cellIndex) => (
            <Cell key={groupIndex * 4 + cellIndex} value={cell} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Cells;
