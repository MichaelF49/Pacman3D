/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';
import Toggle from './Toggle';

const Menu = ({ setShowingMenu }) => {
  return (
    <div className='menu'>
      <h1>PACMAN 3D</h1>
      <h2>
        <b>W S</b>: move forwards/backwards
      </h2>
      <h2>
        <b>A D</b>: rotate
      </h2>
      <h2>
        <b>SPACE</b>: fire
      </h2>
      <h2>
        <b>J K L</b>: switch weapons
      </h2>
      <Toggle />
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
