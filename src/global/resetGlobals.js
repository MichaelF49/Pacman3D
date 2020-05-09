import globals from './globals';
import { handleInitialization, handleWindowResize } from '../handlers';

const resetGlobals = () => {
  // remove canvas
  document.body.removeChild(globals.renderer.domElement);

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

  // re-initialize game variables
  handleInitialization();

  // start and add resize handler
  handleWindowResize();
  window.addEventListener('resize', handleWindowResize, false);
};

export default resetGlobals;
