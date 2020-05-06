import {Clock} from 'three';

export default {
  /**********************************************************
   * PACMAN
   **********************************************************/
  PACMAN_SPEED: 200, // 200 pixels per s
  PACMAN_TURN_SPEED: -Math.PI*3.0/5, // pi radians per s
  PACMAN_HEALTH: 3,

  /**********************************************************
   * TIME
   **********************************************************/
  CLOCK: new Clock(),
  
  /**********************************************************
   * PROJECTILES
   **********************************************************/
  FRUIT: ['cherry', 'orange', 'melon'],
  FRUIT_SCALE: {'cherry': 0.5, 'orange': 111, 'melon': 0.06},
  FRUIT_DAMAGE: {'cherry': 1, 'orange': 2.5, 'melon': 5},
  FRUIT_SPEED: {'cherry': 0.4, 'orange': 0.3, 'melon': 0.2},
  DEFAULT_FRUIT: 'cherry',
  AMMO_INC: 5, // get 5 ammo per pickup
  MAX_AMMO_CAPACITY: 10, // max ammo per category

  /**********************************************************
   * POWERUPS
   **********************************************************/
  POWERUP: ['freeze', 'star'],
  POWERUP_SCALE: {'freeze': 2, 'star': 0.125},
  FREEZE_TIME: 4, // 4 s freeze
  STAR_TIME: 6, // 6 s invincibility
  FRUIT_SPAWN_TIME: 15, // time bewteen fruit spawns
  POWERUP_SPAWN_TIME: 30, // time between powerup spawns

  /**********************************************************
   * WAVES
   **********************************************************/
  WAVES: [3, 6, 12],
  DIFFICULTY_SCALE: {MAX_SPEED: 2.1, MAX_HEALTH: 15},
  WAVE_RESET_TIME: 8, // 8 s between waves
  SAFE_RADIUS: 75.0, // safe distance to spawn enemies

  /**********************************************************
   * MAP
   **********************************************************/
  ARENA_SIZE: 800.0, // size of main room
  BRANCH_SIZE: 600.0, // size of the branching rooms
  HALLWAY_LENGTH: 200.0,
  DOOR_WIDTH: 70.0
};