export default {
  /** ********************************************************
   * SCENE OBJECTS
   ******************************************************** */
  camera: null,
  scene: null,
  renderer: null,
  composer: null,
  pacman: null,
  loader: null,

  /** ********************************************************
   * AUDIO
   ******************************************************** */
  listener: null,
  audioLoader: null,
  globalMusic: null,

  /** ********************************************************
   * KEYBOARD CONTROLS
   ******************************************************** */
  moveForward: false,
  moveBackward: false,
  moveLeft: false,
  moveRight: false,
  spaceDown: false, // prevent repetitive fires

  /** ********************************************************
   * HUD UPDATES
   ********************************************************* */
  updateAmmo: () => {
    return null;
  },
  updateGameProps: () => {
    return null;
  },
  updateHeartsAndPowerup: () => {
    return null;
  },

  updatePaused: () => {
    return null;
  },
  paused: false,
  pauseTime: 0,

  /** ********************************************************
   * GAME PROPERTIES
   ******************************************************** */
  gameOverTime: -1,
  gameOver: false,
  victory: false,
  defeat: false,
  clock: null,
  score: 0,

  enemies: null,
  currentWave: 0,
  startedWave: false,
  startWaveTime: 0,

  rooms: null,
  hallways: null,

  pickups: null,
  lastFruitSpawnTime: 0,
  lastPowerupSpawnTime: 0,
  freeze: false,
  freezeStart: 0,
  star: false,
  starStart: 0,
  starMusic: null,
};
