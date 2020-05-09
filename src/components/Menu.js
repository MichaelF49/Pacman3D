import React from 'react';

const Menu = ({ setShowingMenu }) => {
  return (
    <div className='menu'>
      <h1>PACMAN 3D</h1>
      <h3>W S: move forwards/backwards</h3>
      <h3>A D: rotate</h3>
      <h3>SPACE: fire</h3>
      <h3>1 2 3: switch weapons</h3>
      <button
        className='button'
        onClick={() => {
          setShowingMenu(false);
        }}
        type='button'
      >
        START GAME
      </button>
    </div>
  );
};

export default Menu;
