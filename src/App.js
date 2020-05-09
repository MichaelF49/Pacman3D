import React from 'react';

import TopHud from './components/TopHud';
import RightHud from './components/RightHud';
import BottomHud from './components/BottomHud';
import './app.css';

import consts from './global/consts';
import globals from './global/globals';

import {
  handleAI,
  handleKeys,
  handleMovement,
  handlePickups,
  handleShooting,
  handleWave,
} from './handlers';
import handleInitialization from './handlers/handle_initialization';

const App = () => {
  /** ********************************************************
   * RENDER HANDLER
   ********************************************************* */
  const onAnimationFrameHandler = (timeStamp) => {
    if (!globals.gameOver) {
      window.requestAnimationFrame(onAnimationFrameHandler);
      handleMovement();
      handleShooting();
      handleWave();
      handleAI();
      handlePickups();
      // eslint-disable-next-line no-unused-expressions
      globals.scene.update && globals.scene.update(timeStamp);
      globals.composer.render();
    }
  };

  /** ********************************************************
   * RESIZE HANDLER
   ********************************************************* */
  const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    globals.camera.aspect = innerWidth / innerHeight;
    globals.camera.updateProjectionMatrix();
    globals.renderer.setSize(innerWidth, innerHeight);
  };

  /** ********************************************************
   * START APPLICATION
   ********************************************************* */
  // initialize scene
  handleInitialization();
  // create and add key handlers
  handleKeys();
  // start scene
  window.requestAnimationFrame(onAnimationFrameHandler);
  // start and add resize handler
  windowResizeHandler();
  window.addEventListener('resize', windowResizeHandler, false);

  return (
    <div>
      <TopHud
        orange={globals.pacman.ammo.orange}
        melon={globals.pacman.ammo.melon}
      />
      <RightHud
        score={globals.score}
        wave={globals.currentWave}
        enemies={globals.enemies.size}
      />
      <BottomHud hearts={consts.PACMAN_HEALTH} />
    </div>
  );
};

export default App;
