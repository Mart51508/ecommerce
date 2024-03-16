import React, { useState } from 'react';

function SubCat() {
  const [iconState, setIconState] = useState(Array(10).fill(false)); // Assuming 10 icons, adjust as per your requirement

  const handleClick = (index) => {
    const newIconState = [...iconState];
    newIconState[index] = !newIconState[index];
    setIconState(newIconState);
  };

  return (
    <div>
      {iconState.map((isRed, index) => (
        <i
          key={index}
          className={`icon ${isRed ? 'red' : ''}`}
          onClick={() => handleClick(index)}
          style={{ color: isRed ? 'red' : 'black' }}
        >
          Your Icon
        </i>
      ))}
    </div>
  );
}

export default SubCat;
