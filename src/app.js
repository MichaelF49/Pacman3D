import globals from './globals';
import {
  handleAI,
  handleKeys,
  handleMovement,
  handlePickups,
  handleShooting,
  handleWave,
} from './handlers';
import initialize from './initialize';

/** ********************************************************
 * RENDER HANDLER
 ******************************************************** */
const onAnimationFrameHandler = (timeStamp) => {
  if (!globals.gameOver) {
    // eslint-disable-next-line no-undef
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
 ******************************************************** */
const windowResizeHandler = () => {
  // eslint-disable-next-line no-undef
  const { innerHeight, innerWidth } = window;
  globals.camera.aspect = innerWidth / innerHeight;
  globals.camera.updateProjectionMatrix();
  globals.renderer.setSize(innerWidth, innerHeight);
};

/** ********************************************************
 * START APPLICATION
 ******************************************************** */
// initialize scene
initialize();
// create and add key handlers
handleKeys();
// start scene
// eslint-disable-next-line no-undef
window.requestAnimationFrame(onAnimationFrameHandler);
// start and add resize handler
windowResizeHandler();
// eslint-disable-next-line no-undef
window.addEventListener('resize', windowResizeHandler, false);
