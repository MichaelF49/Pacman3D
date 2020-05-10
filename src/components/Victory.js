/* eslint-disable react/prop-types */
import React from 'react';

import { globals, resetGlobals } from '../global';

const Victory = ({ setShowingVictory, setShowingDefeat, setShowingMenu }) => {
  return (
    <div className='menu' id='victory'>
      <h1>VICTORY!</h1>
      <h3> FINAL SCORE: 
        {' '}
        {globals.score}
      </h3>
      <button
        className='button'
        onClick={() => {
          resetGlobals();
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

export default Victory;
