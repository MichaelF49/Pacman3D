/* eslint-disable no-restricted-syntax */
import { globals } from '../global';
import { handleInitialization, handleWindowResize } from '.';

const handleResetGlobals = () => {
  // remove canvas
  document.body.removeChild(globals.renderer.domElement);

  for (const enemy of globals.enemies) {
    globals.enemies.delete(enemy);
  }
  for (const pickup of globals.pickups) {
    globals.enemies.delete(pickup);
  }

  globals.renderer.dispose();
  for (const child of globals.scene.children) {
    if (child.geometry !== undefined) {
      child.geometry.dispose();
    }
    if (child.material !== undefined) {
      child.material.dispose();
    }
  }
  globals.scene.dispose();

  globals.camera = null;
  globals.scene = null;
  globals.renderer = null;
  globals.composer = null;
  globals.pacman = null;
  globals.loader = null;
  globals.listener = null;
  globals.audioLoader = null;
  globals.globalMusic = null;
  globals.moveForward = false;
  globals.moveBackward = false;
  globals.moveLeft = false;
  globals.moveRight = false;
  globals.spaceDown = false;
  globals.updateAmmo = () => {
    return null;
  };
  globals.updateGameProps = () => {
    return null;
  };
  globals.updateHeartsAndPowerup = () => {
    return null;
  };
  globals.updatePaused = () => {
    return null;
  };
  globals.pauseTime = 0;
  globals.gameOverTime = -1;
  globals.gameOver = false;
  globals.victory = false;
  globals.defeat = false;
  globals.clock = null;
  globals.score = 0;
  globals.enemies = null;
  globals.currentWave = 0;
  globals.startedWave = false;
  globals.startWaveTime = 0;
  globals.rooms = null;
  globals.hallways = null;
  globals.pickups = null;
  globals.lastFruitSpawnTime = 0;
  globals.lastPowerupSpawnTime = 0;
  globals.freeze = false;
  globals.freezeStart = 0;
  globals.star = false;
  globals.starStart = 0;
  globals.starMusic = null;

  // re-initialize game variables
  handleInitialization();

  // start and add resize handler
  handleWindowResize();
  window.addEventListener('resize', handleWindowResize, false);
};

export default handleResetGlobals;
