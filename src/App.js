import globals from './globals';
import {handleAI, handleKeys, handleMovement, handlePickups,
        handleShooting, handleWave} from './handlers';
import initialize from './initialize';
import React from 'react'
import './App.css'

const App = () => {

  /**********************************************************
   * RENDER HANDLER
   **********************************************************/
  let onAnimationFrameHandler = (timeStamp) => {
    if (!globals.gameOver) {
      window.requestAnimationFrame(onAnimationFrameHandler);
      handleMovement();
      handleShooting();
      handleWave();
      handleAI();
      handlePickups();
      globals.scene.update && globals.scene.update(timeStamp);
      globals.composer.render();
    }
  };

  /**********************************************************
   * RESIZE HANDLER
   **********************************************************/
  let windowResizeHandler = () => {
    let {innerHeight, innerWidth} = window;
    globals.camera.aspect = innerWidth/innerHeight;
    globals.camera.updateProjectionMatrix();
    globals.renderer.setSize(innerWidth, innerHeight);
  };

  /**********************************************************
   * START APPLICATION
   **********************************************************/
  // initialize scene
  initialize();
  // create and add key handlers
  handleKeys();
  // start scene
  window.requestAnimationFrame(onAnimationFrameHandler);
  // start and add resize handler
  windowResizeHandler();
  window.addEventListener('resize', windowResizeHandler, false);

  return (
    <div className='top-hud'>
      <p >Cherries: {globals.pacman.ammo['cherry']}, Oranges: {globals.pacman.ammo['orange']}, Melons: {globals.pacman.ammo['melon']}</p>
    </div>
  )
};

export default App
