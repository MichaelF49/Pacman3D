/* eslint-disable no-restricted-syntax */
/* eslint-disable default-case */
import { Audio, Vector3 } from 'three';

import { Pickup } from '../objects';

import consts from '../consts';
import globals from '../globals';

import POP_mp3 from '../audio/pop.mp3';

const handlePickups = () => {
  // Check timers
  if (
    globals.freeze &&
    globals.clock.getElapsedTime() - globals.freezeStart > consts.FREEZE_TIME
  ) {
    globals.freeze = false;
  }
  if (
    globals.star &&
    globals.clock.getElapsedTime() - globals.starStart > consts.STAR_TIME
  ) {
    globals.star = false;
  }

  // Spawn fruit
  if (
    globals.clock.getElapsedTime() - globals.lastFruitSpawnTime >
    consts.FRUIT_SPAWN_TIME
  ) {
    globals.lastFruitSpawnTime = globals.clock.getElapsedTime();

    // Choose random non-cherry fruit to spawn
    const fruitIndex =
      Math.floor(Math.random() * (consts.FRUIT.length - 1)) + 1;
    const fruit = consts.FRUIT[fruitIndex];
    const scale = consts.FRUIT_SCALE[fruit];

    // Create ammo Pickup object
    const pickup = new Pickup(fruit, 'ammo');
    pickup.scale.multiplyScalar(scale);
    const spawnPos = new Vector3(
      Math.random() * consts.ARENA_SIZE - consts.ARENA_SIZE / 2,
      -20,
      Math.random() * consts.ARENA_SIZE - consts.ARENA_SIZE / 2
    );
    pickup.position.add(spawnPos);

    globals.scene.add(pickup);
    globals.pickups.add(pickup);
  }

  // Spawn powerup
  if (
    globals.clock.getElapsedTime() - globals.lastPowerupSpawnTime >
    consts.POWERUP_SPAWN_TIME
  ) {
    globals.lastPowerupSpawnTime = globals.clock.getElapsedTime();

    // Choose random powerup to spawn
    const powerupIndex = Math.floor(Math.random() * consts.POWERUP.length);
    const powerup = consts.POWERUP[powerupIndex];
    const scale = consts.POWERUP_SCALE[powerup];

    // Create powerup Pickup object
    const pickup = new Pickup(powerup, 'powerup');
    pickup.scale.multiplyScalar(scale);
    const spawnPos = new Vector3(
      Math.random() * consts.ARENA_SIZE - consts.ARENA_SIZE / 2,
      -20,
      Math.random() * consts.ARENA_SIZE - consts.ARENA_SIZE / 2
    );
    pickup.position.add(spawnPos);

    globals.scene.add(pickup);
    globals.pickups.add(pickup);
  }

  for (const pickup of globals.pickups) {
    const hitDist = pickup.position
      .clone()
      .setY(0)
      .distanceTo(globals.pacman.position.clone().setY(0));
    if (hitDist < 25) {
      globals.scene.remove(pickup);
      globals.pickups.delete(pickup);

      const sound = new Audio(globals.listener);
      globals.audioLoader.load(POP_mp3, (buffer) => {
        sound.setBuffer(buffer);
        sound.setVolume(0.2);
        sound.play();
      });

      // ammo effect
      if (pickup.type === 'ammo') {
        globals.pacman.ammo[pickup.name] = Math.min(
          consts.MAX_AMMO_CAPACITY,
          globals.pacman.ammo[pickup.name] + consts.AMMO_INC[pickup.name]
        );
      }

      // powerup effect
      if (pickup.type === 'powerup') {
        switch (pickup.name) {
          case 'freeze': {
            globals.freeze = true;
            globals.freezeStart = globals.clock.getElapsedTime();
            break;
          }
          case 'star': {
            globals.star = true;
            globals.starStart = globals.clock.getElapsedTime();
            break;
          }
        }
      }
    }
  }
};

export default handlePickups;
