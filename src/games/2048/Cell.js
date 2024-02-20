import React from 'react'
import './Cell.css'




const Cell = myprops => {

    return (
      <div className={`cell cell-${myprops.value}`}>
        {myprops.value}
      </div>
    )
};

export default Cell;