import {Audio} from 'three';

import consts from "../consts";
import globals from "../globals";

let deleteProjectile = (projectile) => {
  let sound = new Audio(globals.listener);
  globals.audioLoader.load('./src/music/pop.mp3', (buffer) => {
    sound.setBuffer(buffer);
    sound.setVolume(0.05);
    sound.play();
  });
  globals.scene.remove(projectile);
  globals.pacman.projectiles.delete(projectile);
}

let handleShooting = () => {
  for (let projectile of globals.pacman.projectiles) {
    // move projectile through scene
    let projectileVec = projectile.direction;
    projectile.position.add(projectileVec.clone().multiplyScalar(projectile.speed));

    // handle enemy collision
    for (let enemy of globals.enemies) {
      let hitDist = enemy.position.clone().setY(0).
        distanceTo(projectile.position.clone().setY(0));
      // enemy takes damage
      if (hitDist < 25) {
        globals.scene.remove(projectile);
        globals.pacman.projectiles.delete(projectile);
        enemy.health -= projectile.damage;

        // enemy has no health, kill and delete from scene
        if (enemy.health <= 0) {
          globals.scene.remove(enemy);
          globals.enemies.delete(enemy);
          enemy.death();
        }
      }
    }

    let barrier;
    let projectileBuffer = projectile.speed + 20;
    let oldPosition = projectile.position.clone();

    // central x tunnel
    if (projectile.position.x >= -consts.DOOR_WIDTH/2 + projectileBuffer &&
        projectile.position.x <= consts.DOOR_WIDTH/2  - projectileBuffer) {
      barrier = consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH + consts.BRANCH_SIZE - projectileBuffer;
      projectile.position.setZ(Math.max(Math.min(barrier, projectile.position.z), -barrier));
      if (projectile.position.z !== oldPosition.z) {
        deleteProjectile(projectile);
      }
      // hallways
      if (projectile.position.z >= -consts.ARENA_SIZE/2 - consts.HALLWAY_LENGTH &&
          projectile.position.z <= -consts.ARENA_SIZE/2) {
        barrier = consts.DOOR_WIDTH/2 - projectileBuffer;
        projectile.position.setX(Math.max(Math.min(barrier, projectile.position.x), -barrier));
        if (projectile.position.x !== oldPosition.x) {
          deleteProjectile(projectile);
        }
      }
      if (projectile.position.z <= consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH &&
          projectile.position.z >= consts.ARENA_SIZE/2) {
        barrier = consts.DOOR_WIDTH/2 - projectileBuffer;
        projectile.position.setX(Math.max(Math.min(barrier, projectile.position.x), -barrier));
        if (projectile.position.x !== oldPosition.x) {
          deleteProjectile(projectile);
        }
      }
    }
    // central z tunnel
    else if (projectile.position.z >= -consts.DOOR_WIDTH/2 + projectileBuffer &&
             projectile.position.z <= consts.DOOR_WIDTH/2 - projectileBuffer) {
      barrier = consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH + consts.BRANCH_SIZE - projectileBuffer;
      projectile.position.setX(Math.max(Math.min(barrier, projectile.position.x), -barrier));
      if (projectile.position.x !== oldPosition.x) {
        deleteProjectile(projectile);
      }
      // hallways
      if (projectile.position.x >= -consts.ARENA_SIZE/2 - consts.HALLWAY_LENGTH &&
          projectile.position.x <= -consts.ARENA_SIZE/2) {
        barrier = consts.DOOR_WIDTH/2 - projectileBuffer;
        projectile.position.setZ(Math.max(Math.min(barrier, projectile.position.z), -barrier));
        if (projectile.position.z !== oldPosition.z) {
          deleteProjectile(projectile);
        }
      }
      if (projectile.position.x <= consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH &&
          projectile.position.x >= consts.ARENA_SIZE/2) {
        barrier = consts.DOOR_WIDTH/2 - projectileBuffer;
        projectile.position.setZ(Math.max(Math.min(barrier, projectile.position.z), -barrier));
        if (projectile.position.z !== oldPosition.z) {
          deleteProjectile(projectile);
        }
      }
    }
    // hallways
    else if (projectile.position.x >= -consts.ARENA_SIZE/2 - consts.HALLWAY_LENGTH &&
             projectile.position.x <= -consts.ARENA_SIZE/2) {
      barrier = consts.DOOR_WIDTH/2 - projectileBuffer;
      projectile.position.setZ(Math.max(Math.min(barrier, projectile.position.z), -barrier));
      if (projectile.position.z !== oldPosition.z) {
        deleteProjectile(projectile);
      }
    }
    else if (projectile.position.x <= consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH &&
             projectile.position.x >= consts.ARENA_SIZE/2) {
      barrier = consts.DOOR_WIDTH/2 - projectileBuffer;
      projectile.position.setZ(Math.max(Math.min(barrier, projectile.position.z), -barrier));
      if (projectile.position.z !== oldPosition.z) {
        deleteProjectile(projectile);
      }
    }
    // hallways
    else if (projectile.position.z >= -consts.ARENA_SIZE/2 - consts.HALLWAY_LENGTH &&
             projectile.position.z <= -consts.ARENA_SIZE/2) {
      barrier = consts.DOOR_WIDTH/2 - projectileBuffer;
      projectile.position.setX(Math.max(Math.min(barrier, projectile.position.x), -barrier));
      if (projectile.position.x !== oldPosition.x) {
        deleteProjectile(projectile);
      }
    }
    else if (projectile.position.z <= consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH &&
             projectile.position.z >= consts.ARENA_SIZE/2) {
      barrier = consts.DOOR_WIDTH/2 - projectileBuffer;
      projectile.position.setX(Math.max(Math.min(barrier, projectile.position.x), -barrier));
      if (projectile.position.x !== oldPosition.x) {
        deleteProjectile(projectile);
      }
    }
    else {
      let curRoom;
      for (let room of globals.rooms) {
        if (room.isInside(projectile.position))  {
          curRoom = room;
          break;
        }
      }

      projectile.position.setX(
        Math.max(
          Math.min(curRoom.maxX - projectileBuffer, projectile.position.x),
          curRoom.minX + projectileBuffer
        )
      );
      if (projectile.position.x !== oldPosition.x) {
        deleteProjectile(projectile);
      }

      projectile.position.setZ(
        Math.max(
          Math.min(curRoom.maxZ - projectileBuffer, projectile.position.z),
          curRoom.minZ + projectileBuffer
        )
      );
      if (projectile.position.z !== oldPosition.z) {
        deleteProjectile(projectile);
      }
    }
  }
}

export default handleShooting;