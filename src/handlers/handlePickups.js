/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
import { Audio, Vector3 } from 'three';

import { FreezeMP3, HealthMP3, PopMP3, StarMP3 } from '../audio';
import { consts, globals } from '../global';
import { Pickup } from '../objects';

const handlePickups = () => {
  checkTimers();

  // Caps the number of pickups on the map at one time
  if (globals.pickups.size < consts.MAX_PICKUPS) {
    spawnFruit();
    spawnPowerup();
  }

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
    globals.updateHeartsAndPowerup();
  }
  if (
    globals.star &&
    globals.clock.getElapsedTime() - globals.starStart > consts.STAR_TIME
  ) {
    globals.star = false;
    globals.globalMusic.play();
    globals.starMusic.stop();
    globals.updateHeartsAndPowerup();
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
    const room = globals.rooms[0]; // Spawn fruit only in the central room
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
      globals.rooms[Math.floor(Math.random() * (globals.rooms.length - 1)) + 1]; // Spawn powerups in edge rooms
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

  if (pickup.name === 'heart') {
    const sound = new Audio(globals.listener);
    globals.audioLoader.load(HealthMP3, (buffer) => {
      sound.setBuffer(buffer);
      sound.setVolume(0.1);
      sound.play();
    });
  } else {
    const sound = new Audio(globals.listener);
    globals.audioLoader.load(PopMP3, (buffer) => {
      sound.setBuffer(buffer);
      sound.setVolume(0.2);
      sound.play();
    });
  }

  // ammo effect
  if (pickup.type === 'ammo') {
    globals.pacman.ammo[pickup.name] = Math.min(
      consts.MAX_AMMO_CAPACITY,
      globals.pacman.ammo[pickup.name] + consts.AMMO_INC[pickup.name]
    );
    globals.updateAmmo();
  }

  // powerup effect
  if (pickup.type === 'powerup') {
    switch (pickup.name) {
      case 'freeze': {
        globals.freeze = true;
        globals.freezeStart = globals.clock.getElapsedTime();
        const sound = new Audio(globals.listener);
        globals.audioLoader.load(FreezeMP3, (buffer) => {
          sound.setBuffer(buffer);
          sound.setVolume(0.2);
          sound.play();
        });
        break;
      }
      case 'star': {
        globals.star = true;
        globals.starStart = globals.clock.getElapsedTime();
        globals.globalMusic.pause();
        globals.starMusic = new Audio(globals.listener);
        globals.audioLoader.load(StarMP3, (buffer) => {
          globals.starMusic.setBuffer(buffer);
          globals.starMusic.setVolume(0.2);
          globals.starMusic.setLoop(true);
          globals.starMusic.play();
        });
        break;
      }
      case 'heart': {
        globals.pacman.health = Math.min(
          consts.PACMAN_MAX_HEALTH,
          globals.pacman.health + 1
        );
        break;
      }
      default: {
        // error
      }
    }

    globals.updateHeartsAndPowerup();
  }
};

export default handlePickups;
