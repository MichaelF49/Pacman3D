/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
import { Audio, Vector3 } from 'three';

import { HitmarkerMP3, PopMP3 } from '../audio';
import { consts, globals } from '../global';
import { Explosion } from '../objects';

const handleShooting = () => {
  for (const projectile of globals.pacman.projectiles) {
    const originalPosition = projectile.position.clone();

    // move projectile through scene
    const projectileVec = projectile.direction;
    projectile.position.add(
      projectileVec.clone().multiplyScalar(projectile.speed)
    );

    // handle enemy collision
    for (const enemy of globals.enemies) {
      const hitDist = enemy.position
        .clone()
        .setY(0)
        .distanceTo(projectile.position.clone().setY(0));
      // enemy takes damage
      if (hitDist < 25) {
        const sound = new Audio(globals.listener);
        globals.audioLoader.load(HitmarkerMP3, (buffer) => {
          sound.setBuffer(buffer);
          sound.setVolume(0.2);
          sound.play();
        });

        deleteProjectile(projectile, originalPosition);
        enemy.health -= projectile.damage;

        // enemy has no health, kill and delete from scene
        if (enemy.health <= 0) {
          globals.score += 100;
          enemy.death();
          globals.updateGameProps();
        }
      }
    }

    let barrier;
    const projectileBuffer = projectile.speed + 20;
    const oldPosition = projectile.position.clone();

    // central x tunnel
    if (
      projectile.position.x >= -consts.DOOR_WIDTH / 2 + projectileBuffer &&
      projectile.position.x <= consts.DOOR_WIDTH / 2 - projectileBuffer
    ) {
      barrier =
        consts.ARENA_SIZE / 2 +
        consts.HALLWAY_LENGTH +
        consts.BRANCH_SIZE -
        projectileBuffer;
      projectile.position.setZ(
        Math.max(Math.min(barrier, projectile.position.z), -barrier)
      );
      if (projectile.position.z !== oldPosition.z) {
        deleteProjectile(projectile, originalPosition);
      }
      // hallways
      if (
        projectile.position.z >=
          -consts.ARENA_SIZE / 2 - consts.HALLWAY_LENGTH &&
        projectile.position.z <= -consts.ARENA_SIZE / 2
      ) {
        barrier = consts.DOOR_WIDTH / 2 - projectileBuffer;
        projectile.position.setX(
          Math.max(Math.min(barrier, projectile.position.x), -barrier)
        );
        if (projectile.position.x !== oldPosition.x) {
          deleteProjectile(projectile, originalPosition);
        }
      }
      if (
        projectile.position.z <=
          consts.ARENA_SIZE / 2 + consts.HALLWAY_LENGTH &&
        projectile.position.z >= consts.ARENA_SIZE / 2
      ) {
        barrier = consts.DOOR_WIDTH / 2 - projectileBuffer;
        projectile.position.setX(
          Math.max(Math.min(barrier, projectile.position.x), -barrier)
        );
        if (projectile.position.x !== oldPosition.x) {
          deleteProjectile(projectile, originalPosition);
        }
      }
    } else if (
      projectile.position.z >= -consts.DOOR_WIDTH / 2 + projectileBuffer &&
      projectile.position.z <= consts.DOOR_WIDTH / 2 - projectileBuffer
    ) {
      // central z tunnel

      barrier =
        consts.ARENA_SIZE / 2 +
        consts.HALLWAY_LENGTH +
        consts.BRANCH_SIZE -
        projectileBuffer;
      projectile.position.setX(
        Math.max(Math.min(barrier, projectile.position.x), -barrier)
      );
      if (projectile.position.x !== oldPosition.x) {
        deleteProjectile(projectile, originalPosition);
      }
      // hallways
      if (
        projectile.position.x >=
          -consts.ARENA_SIZE / 2 - consts.HALLWAY_LENGTH &&
        projectile.position.x <= -consts.ARENA_SIZE / 2
      ) {
        barrier = consts.DOOR_WIDTH / 2 - projectileBuffer;
        projectile.position.setZ(
          Math.max(Math.min(barrier, projectile.position.z), -barrier)
        );
        if (projectile.position.z !== oldPosition.z) {
          deleteProjectile(projectile, originalPosition);
        }
      }
      if (
        projectile.position.x <=
          consts.ARENA_SIZE / 2 + consts.HALLWAY_LENGTH &&
        projectile.position.x >= consts.ARENA_SIZE / 2
      ) {
        barrier = consts.DOOR_WIDTH / 2 - projectileBuffer;
        projectile.position.setZ(
          Math.max(Math.min(barrier, projectile.position.z), -barrier)
        );
        if (projectile.position.z !== oldPosition.z) {
          deleteProjectile(projectile, originalPosition);
        }
      }
    } else if (
      projectile.position.x >= -consts.ARENA_SIZE / 2 - consts.HALLWAY_LENGTH &&
      projectile.position.x <= -consts.ARENA_SIZE / 2
    ) {
      // hallways

      barrier = consts.DOOR_WIDTH / 2 - projectileBuffer;
      projectile.position.setZ(
        Math.max(Math.min(barrier, projectile.position.z), -barrier)
      );
      if (projectile.position.z !== oldPosition.z) {
        deleteProjectile(projectile, originalPosition);
      }
    } else if (
      projectile.position.x <= consts.ARENA_SIZE / 2 + consts.HALLWAY_LENGTH &&
      projectile.position.x >= consts.ARENA_SIZE / 2
    ) {
      barrier = consts.DOOR_WIDTH / 2 - projectileBuffer;
      projectile.position.setZ(
        Math.max(Math.min(barrier, projectile.position.z), -barrier)
      );
      if (projectile.position.z !== oldPosition.z) {
        deleteProjectile(projectile, originalPosition);
      }
    } else if (
      projectile.position.z >= -consts.ARENA_SIZE / 2 - consts.HALLWAY_LENGTH &&
      projectile.position.z <= -consts.ARENA_SIZE / 2
    ) {
      // hallways

      barrier = consts.DOOR_WIDTH / 2 - projectileBuffer;
      projectile.position.setX(
        Math.max(Math.min(barrier, projectile.position.x), -barrier)
      );
      if (projectile.position.x !== oldPosition.x) {
        deleteProjectile(projectile, originalPosition);
      }
    } else if (
      projectile.position.z <= consts.ARENA_SIZE / 2 + consts.HALLWAY_LENGTH &&
      projectile.position.z >= consts.ARENA_SIZE / 2
    ) {
      barrier = consts.DOOR_WIDTH / 2 - projectileBuffer;
      projectile.position.setX(
        Math.max(Math.min(barrier, projectile.position.x), -barrier)
      );
      if (projectile.position.x !== oldPosition.x) {
        deleteProjectile(projectile, originalPosition);
      }
    } else {
      let curRoom;
      for (const room of globals.rooms) {
        if (room.isInside(projectile.position)) {
          curRoom = room;
          break;
        }
      }
      if (curRoom === undefined) {
        deleteProjectile(projectile, originalPosition);
        return;
      }

      projectile.position.setX(
        Math.max(
          Math.min(curRoom.maxX - projectileBuffer, projectile.position.x),
          curRoom.minX + projectileBuffer
        )
      );
      if (projectile.position.x !== oldPosition.x) {
        deleteProjectile(projectile, originalPosition);
      }

      projectile.position.setZ(
        Math.max(
          Math.min(curRoom.maxZ - projectileBuffer, projectile.position.z),
          curRoom.minZ + projectileBuffer
        )
      );
      if (projectile.position.z !== oldPosition.z) {
        deleteProjectile(projectile, originalPosition);
      }
    }
  }

  handleExplosions();
};

const deleteProjectile = (projectile, originalPosition) => {
  const sound = new Audio(globals.listener);
  globals.audioLoader.load(PopMP3, (buffer) => {
    sound.setBuffer(buffer);
    sound.setVolume(0.05);
    sound.play();
  });
  globals.scene.remove(projectile);
  globals.pacman.projectiles.delete(projectile);

  const exp = new Explosion(originalPosition, projectile.name);
  globals.pacman.explosions.add(exp);
  globals.scene.add(exp.points);
};

const handleExplosions = () => {
  for (const exp of globals.pacman.explosions) {
    const { center, maxDist, points } = exp;
    let delta = 0.06;
    let deltaSize = 1.2;
    if (exp.fruit === 'orange') {
      delta = 0.04;
      deltaSize = 1.1;
    }
    if (exp.fruit === 'melon') {
      delta = 0.025;
      deltaSize = 1.05;
    }

    for (
      let i = 0;
      i < points.geometry.attributes.position.array.length;
      i += 3
    ) {
      const vec = new Vector3(
        points.geometry.attributes.position.array[i],
        points.geometry.attributes.position.array[i + 1],
        points.geometry.attributes.position.array[i + 2]
      );

      if (vec.distanceTo(center) > maxDist) {
        globals.scene.remove(points);
        globals.pacman.explosions.delete(exp);
        points.geometry.dispose();
        points.material.dispose();
        return;
      }
    }

    for (
      let i = 0;
      i < points.geometry.attributes.position.array.length;
      i += 3
    ) {
      points.geometry.attributes.position.array[i] +=
        (exp.endPositions[i] - exp.center.x) * delta;
      points.geometry.attributes.position.array[i + 1] +=
        (exp.endPositions[i + 1] - exp.center.y) * delta;
      points.geometry.attributes.position.array[i + 2] +=
        (exp.endPositions[i + 2] - exp.center.z) * delta;
    }
    points.material.size /= deltaSize;
    points.material.needsUpdate = true;

    points.geometry.attributes.position.needsUpdate = true;
  }
};

export default handleShooting;
