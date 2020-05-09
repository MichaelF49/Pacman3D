import React from 'react';

const Menu = ({ setShowingMenu }) => {
  return (
    <div className='menu'>
      <h1>Welcome to Pacman 3D!</h1>
      <button
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
