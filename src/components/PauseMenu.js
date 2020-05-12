/* eslint-disable react/prop-types */
import React from 'react';

import { globals } from '../global';

import { handleKeys } from '../handlers';

const PauseMenu = () => {
  return (
    <div className='menu'>
      <h1>PAUSED GAME</h1>
      <h3>W S: move forwards/backwards</h3>
      <h3>A D: rotate</h3>
      <h3>SPACE: fire</h3>
      <h3>J K L: switch weapons</h3>
      <button
        className='button'
        onClick={() => {
          globals.paused = false;
          globals.updatePaused();

          // handle key presses again
          handleKeys(true);

          // update timers
          const passedTime = globals.clock.getElapsedTime() - globals.pauseTime;
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
