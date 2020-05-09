export default {
  /**********************************************************
   * PACMAN
   **********************************************************/
  PACMAN_SPEED: 200, // 200 pixels per s
  PACMAN_TURN_SPEED: -Math.PI*3.0/5, // 3/5*pi radians per s
  PACMAN_HEALTH: 3,

  /**********************************************************
   * GHOST
   **********************************************************/
  KILL_DIST_PACMAN: 25, 
  KILL_DIST_MARIO: 35,
  
  /**********************************************************
   * PROJECTILES
   **********************************************************/
  FRUIT: ['cherry', 'orange', 'melon'],
  FRUIT_SCALE: {'cherry': 0.5, 'orange': 111, 'melon': 0.06},
  FRUIT_DAMAGE: {'cherry': 1, 'orange': 2.5, 'melon': 5},
  FRUIT_SPEED: {'cherry': 0.4, 'orange': 0.3, 'melon': 0.2}, // projectile speed
  DEFAULT_FRUIT: 'cherry',
  AMMO_INC: {'orange': 5, 'melon': 5}, // get 5 ammo per pickup
  MAX_AMMO_CAPACITY: 10, // max ammo per category

  /**********************************************************
   * POWERUPS
   **********************************************************/
  POWERUP: ['freeze', 'star', 'heart'],
  POWERUP_SCALE: {'freeze': 2, 'star': 0.125, 'heart': 0.175},
  FREEZE_TIME: 5, // 5 s freeze
  STAR_TIME: 8, // 8 s invincibility
  FRUIT_SPAWN_TIME: 1, // time bewteen fruit spawns
  POWERUP_SPAWN_TIME: 2, // time between powerup spawns
  BOB_SPEED: 3,
  ROTATION_SPEED: 250, // higher is slower 

  /**********************************************************
   * WAVES
   **********************************************************/
  WAVES: [3, 6, 10], // enemies per wave
  DIFFICULTY_SCALE: {MAX_SPEED: 2, MAX_HEALTH: 10},
  WAVE_RESET_TIME: 8, // 8 s between waves
  SAFE_RADIUS: 75.0, // safe distance to spawn enemies

  /**********************************************************
   * MAP
   **********************************************************/
  ARENA_SIZE: 800.0, // size of main room
  BRANCH_SIZE: 600.0, // size of the branching rooms
  HALLWAY_LENGTH: 200.0,
  DOOR_WIDTH: 70.0,
  PACMAN_BUFFER: 14,
  GHOST_RADIUS: 15
};