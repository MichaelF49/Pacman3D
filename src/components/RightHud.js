/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';

import { globals } from '../global';
import { handleKeys } from '../handlers';

const RightHud = () => {
  const [scoreState, setScore] = useState(globals.score);
  const [waveState, setWave] = useState(globals.currentWave);
  const [enemiesState, setEnemies] = useState(globals.enemies.size);

  globals.updateGameProps = () => {
    setScore(globals.score);
    setWave(globals.currentWave);
    setEnemies(globals.enemies.size);
  };

  return (
    <div className='right-hud'>
      <button
        className='resumeButton'
        onClick={() => {
          globals.paused = true;
          globals.pauseTime = globals.clock.getElapsedTime();
          globals.updatePaused();

          // if star music is playing
          if (globals.starMusic !== null) {
            globals.starMusic.pause();
            globals.globalMusic.play();
          }

          // disable movement/shooting
          globals.moveForward = false;
          globals.moveBackward = false;
          globals.moveLeft = false;
          globals.moveRight = false;
          globals.spaceDown = false;

          // remove key handlers
          handleKeys(false);
        }}
        type='button'
      >
        PAUSE GAME
      </button>
      <div>SCORE: {scoreState}</div>
      <div>WAVE: {waveState}</div>
      <div>ENEMIES: {enemiesState}</div>
    </div>
  );
};

export default RightHud;
