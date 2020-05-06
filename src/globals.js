export default {
  /**********************************************************
   * KEYBOARD CONTROLS
   **********************************************************/
  moveForward: false,
  moveBackward: false,
  moveLeft: false,
  moveRight: false,
  spaceDown: false, // prevent repetitive fires

  /**********************************************************
   * GAME PROPERTIES
   **********************************************************/
  gameOver: false,

  enemies: new Set(),
  currentWave: 0,
  startedWave: false,
  startTime: 0,

  rooms: [], // list of rooms
  hallways: [],

  pacmanBuffer: 14,
  ghostRadius: 15,

  pickups: new Set(),
  lastFruitSpawnTime: 0,
  lastPowerupSpawnTime: 0,
  freeze: false,
  freezeStart: 0,
  star: false,
  starStart: 0
}