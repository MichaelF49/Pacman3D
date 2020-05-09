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
  updateAmmo: () => null,
  updateGameProps: () => null,
  updateHearts: () => null,

  /** ********************************************************
   * GAME PROPERTIES
   ******************************************************** */
  gameOver: false,
  clock: null,
  score: 0,

  enemies: new Set(),
  currentWave: 0,
  startedWave: false,
  startTime: 0,

  rooms: [], // list of rooms
  hallways: [],

  pickups: new Set(),
  lastFruitSpawnTime: 0,
  lastPowerupSpawnTime: 0,
  freeze: false,
  freezeStart: 0,
  star: false,
  starStart: 0,
};
