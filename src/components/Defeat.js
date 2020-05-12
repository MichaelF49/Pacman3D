/* eslint-disable react/prop-types */
import React from 'react';

import { globals } from '../global';
import { handleResetGlobals } from '../handlers';

const Defeat = ({ setShowingVictory, setShowingDefeat, setShowingMenu }) => {
  return (
    <div className='menu' id='defeat'>
      <h1>DEFEAT!</h1>
      <h2>Final Score:</h2>
      <span className='score'>{globals.score}</span>
      <button
        className='button'
        onClick={() => {
          handleResetGlobals();
          setShowingVictory(false);
          setShowingDefeat(false);
          setShowingMenu(true);
        }}
        type='button'
      >
        PLAY AGAIN?
      </button>
    </div>
  );
};

export default Defeat;
