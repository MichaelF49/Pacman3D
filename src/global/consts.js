export default {
  /** ********************************************************
   * PACMAN
   ******************************************************** */
  PACMAN_SPEED: 200, // 200 pixels per s
  PACMAN_TURN_SPEED: (-Math.PI * 3.0) / 5, // 3/5*pi radians per s
  PACMAN_HEALTH: 3,
  PACMAN_MAX_HEALTH: 6,
  PACMAN_BRIGHTNESS: 1.5,

  /** ********************************************************
   * GHOST
   ********************************************************* */
  KILL_DIST_PACMAN: 25,
  KILL_DIST_MARIO: 35,

  /** ********************************************************
   * PROJECTILES
   ********************************************************* */
  FRUIT: ['cherry', 'orange', 'melon'],
  FRUIT_SCALE: { cherry: 0.5, orange: 111, melon: 0.06 },
  FRUIT_DAMAGE: { cherry: 1, orange: 2.5, melon: 5 },
  FRUIT_SPEED: { cherry: 0.4, orange: 0.3, melon: 0.2 }, // projectile speed
  DEFAULT_FRUIT: 'cherry',
  AMMO_INC: { orange: 5, melon: 5 }, // get 5 ammo per pickup
  MAX_AMMO_CAPACITY: 20, // max ammo per category
  MAX_PICKUPS: 20, // the maximum number of pickups on the map
  EXPLOSION_NUM_PARTICLES: 30,
  EXPLOSION_PARTICLE_SIZE: 15,

  /** *********************************************************
   * COLORS
   ********************************************************* */
  PINK: 0xf4c0dc, // PINK 244, 192, 220
  RED: 0xdc362f, // RED 220, 54, 47
  BLUE: 0x75fbd0, // BLUE 117, 251, 224
  YELLOW: 0xf5bf5b, // YELLOW 245, 191, 91
  WHITE: 0xffffff,
  FLOOR_YELLOW: 0xfdf0c4, // FLOOR YELLOW
  /** *********************************************************
   * POWERUPS
   ********************************************************* */
  POWERUP: ['freeze', 'heart', 'star'],
  POWERUP_SCALE: { freeze: 2, star: 0.125, heart: 0.175 },
  FREEZE_TIME: 5, // 5 s freeze
  STAR_TIME: 8, // 8 s invincibility
  FRUIT_SPAWN_TIME: 10, // time bewteen fruit spawns
  POWERUP_SPAWN_TIME: 15, // time between powerup spawns
  BOB_SPEED: 3,
  ROTATION_SPEED: 250, // higher is slower
  LAST_ITEM_BIAS: 0.5, // higher number reduces the probability of spawning the last power up in POWERUP array

  /** ********************************************************
   * WAVES
   ******************************************************** */
  WAVES: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30], // enemies per wave
  DIFFICULTY_SCALE: { MAX_SPEED: 2, MAX_HEALTH: 10 },
  WAVE_RESET_TIME: 8, // 8 s between waves
  SAFE_RADIUS: 75.0, // safe distance to spawn enemies

  /** ********************************************************
   * MAP
   ******************************************************** */
  ARENA_SIZE: 800.0, // size of main room
  BRANCH_SIZE: 600.0, // size of the branching rooms
  HALLWAY_LENGTH: 200.0,
  DOOR_WIDTH: 90,
  PACMAN_BUFFER: 25, // buffer between pac-man and boundaries
  // HALLWAY_BUFFER: 0, // buffer between pac-man and the hallways
  GHOST_RADIUS: 15,

  /** ********************************************************
   * PATHING AI
   ******************************************************** */
  MAIN_ZONE: 400, // distance from map center to arena pathing zone
  BRANCH_ZONE: 600, // distance from map center to room pathing zone
  ZONE_RADIUS: 25, // radius of the pathing zone
};
