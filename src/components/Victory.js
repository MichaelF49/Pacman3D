/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';

import { globals } from '../global';

const Victory = ({ setShowingVictory, setShowingLeaderboard }) => {
  return (
    <div className='menu end' id='victory'>
      <h1>VICTORY!</h1>
      <h2>Final Score:</h2>
      <span className='score'>{globals.score}</span>
      <h2>Final Wave:</h2>
      <span className='score'>{globals.currentWave}</span>
      <button
        className='button'
        onClick={() => {
          setShowingVictory(false);
          setShowingLeaderboard(true);
        }}
        type='button'
      >
        CONTINUE
      </button>
    </div>
  );
};

export default Victory;
