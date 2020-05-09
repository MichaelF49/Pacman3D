import React from 'react';

import { globals, resetGlobals } from '../global';

const Defeat = ({ setShowingVictory, setShowingDefeat, setShowingMenu }) => {
  return (
    <div className='defeat'>
      <h1>DEFEAT!</h1>
      <h3> FINAL SCORE: {globals.score}</h3>
      <button
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

export default Defeat;
