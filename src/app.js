import globals from './globals';
import {handleAI, handleKeys, handleMovement, handlePickups,
        handleShooting, handleWave} from './handlers';
import initialize from './initialize';

// initialize scene
initialize();
// create and add key handlers
handleKeys();

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
window.requestAnimationFrame(onAnimationFrameHandler);

/**********************************************************
 * RESIZE HANDLER
 **********************************************************/
let windowResizeHandler = () => {
  let {innerHeight, innerWidth} = window;
  globals.camera.aspect = innerWidth/innerHeight;
  globals.camera.updateProjectionMatrix();
  globals.renderer.setSize(innerWidth, innerHeight);
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);