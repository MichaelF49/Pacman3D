/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';

import { globals } from '../global';

import { handleKeys } from '../handlers';

const PauseMenu = () => {
  return (
    <div className='menu'>
      <h1>PAUSED GAME</h1>
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
      <h2>
        <b>Endless</b>: {globals.survival ? 'Yes' : 'No'}
      </h2>
      <button
        className='button'
        onClick={() => {
          globals.paused = false;
          globals.updatePaused();

          // handle key presses again
          handleKeys(true);

          // update timers
          const passedTime = globals.clock.getElapsedTime() - globals.pauseTime;
          globals.totalPausedTime += passedTime;
          globals.lastFruitSpawnTime += passedTime;
          globals.lastPowerupSpawnTime += passedTime;
          globals.freezeStart += passedTime;
          globals.starStart += passedTime;
          globals.startWaveTime += passedTime;

          // if star music was playing
          if (globals.starMusic !== null) {
            globals.starMusic.play();
            globals.globalMusic.pause();
          }
        }}
        type='button'
      >
        RESUME GAME
      </button>
    </div>
  );
};

export default PauseMenu;
