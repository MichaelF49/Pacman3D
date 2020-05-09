/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
import { Audio, Vector3 } from 'three';

import { Pickup } from '../objects';

import consts from '../consts';
import globals from '../globals';

import PopMP3 from '../audio/pop.mp3';

const handlePickups = () => {
  checkTimers();
  spawnFruit();
  spawnPowerup();

  for (const pickup of globals.pickups) {
    const hitDist = pickup.position
      .clone()
      .setY(0)
      .distanceTo(globals.pacman.position.clone().setY(0));
    if (hitDist < 25) {
      handleCollision(pickup);
    }

    pickup.position.y +=
      Math.sin(
        (globals.clock.getElapsedTime() + pickup.seed) * consts.BOB_SPEED
      ) * pickup.hoverHeight;
    pickup.rotation.y += globals.clock.getElapsedTime() / consts.ROTATION_SPEED;
  }
};

let checkTimers = () => {
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
};

let spawnFruit = () => {
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

    // Get spawn position
    const room =
      globals.rooms[Math.floor(Math.random() * globals.rooms.length)];
    const x = Math.random() * (room.maxX - room.minX) + room.minX;
    const z = Math.random() * (room.maxZ - room.minZ) + room.minZ;
    const spawnPos = new Vector3(x, -17, z);

    pickup.position.add(spawnPos);
    globals.scene.add(pickup);
    globals.pickups.add(pickup);
  }
};

let spawnPowerup = () => {
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

    // Get spawn position
    const room =
      globals.rooms[Math.floor(Math.random() * globals.rooms.length)];
    const x = Math.random() * (room.maxX - room.minX) + room.minX;
    const z = Math.random() * (room.maxZ - room.minZ) + room.minZ;
    const spawnPos = new Vector3(x, -17, z);

    pickup.position.add(spawnPos);
    globals.scene.add(pickup);
    globals.pickups.add(pickup);
  }
};

let handleCollision = (pickup) => {
  globals.scene.remove(pickup);
  globals.pickups.delete(pickup);

  const sound = new Audio(globals.listener);
  globals.audioLoader.load(PopMP3, (buffer) => {
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
    globals.updateAmmo(globals.pacman.ammo.orange, globals.pacman.ammo.melon);
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
      case 'heart': {
        globals.pacman.health += 1;
        globals.updateHearts(globals.pacman.health);
        break;
      }
      default: {
        // error
      }
    }
  }
};

export default handlePickups;
