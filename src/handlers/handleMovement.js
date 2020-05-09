/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
import { Quaternion, Vector3 } from 'three';

import { consts, globals } from '../global';

const handleMovement = () => {
  const delta = globals.clock.getDelta(); // seconds
  const moveDistance = consts.PACMAN_SPEED * delta;
  const rotateAngle = consts.PACMAN_TURN_SPEED * delta;

  const forwardDirection =
    Number(globals.moveForward) - Number(globals.moveBackward);
  const rotateDirection = Number(globals.moveRight) - Number(globals.moveLeft);

  // left/right rotation
  if (globals.moveLeft || globals.moveRight) {
    const q = new Quaternion();
    q.setFromAxisAngle(new Vector3(0, 1, 0), rotateAngle * rotateDirection);

    globals.camera.applyQuaternion(q);
    globals.camera.position.sub(globals.pacman.position);
    globals.camera.position.applyQuaternion(q);
    globals.camera.position.add(globals.pacman.position);

    globals.pacman.applyQuaternion(q);
  }

  // front/back movement
  if (globals.moveForward || globals.moveBackward) {
    const oldVec = globals.pacman.position.clone();

    const vec = new Vector3().subVectors(
      globals.pacman.position,
      globals.camera.position
    );
    vec
      .setY(0)
      .normalize()
      .multiplyScalar(moveDistance * forwardDirection);
    globals.pacman.position.add(vec);

    // updates pac-man's position with respect to the boundaries
    updatePacPosition();

    const newVec = globals.pacman.position.clone();
    const vecDiff = newVec.sub(oldVec);
    globals.camera.position.add(vecDiff);
  }
};

const updatePacPosition = () => {
  let barrier;
  let entrance = consts.ARENA_SIZE / 2 - consts.PACMAN_BUFFER;
  // central x tunnel
  if (
    globals.pacman.position.x >=
      -consts.DOOR_WIDTH / 2 + consts.PACMAN_BUFFER &&
    globals.pacman.position.x <= consts.DOOR_WIDTH / 2 - consts.PACMAN_BUFFER
  ) {
    barrier =
      consts.ARENA_SIZE / 2 +
      consts.HALLWAY_LENGTH +
      consts.BRANCH_SIZE -
      consts.PACMAN_BUFFER;
    
    // unlock the BLUE room at wave 3
    if (globals.currentWave < 3) {
      globals.pacman.position.setZ(
        Math.max(Math.min(entrance, globals.pacman.position.z), -entrance)
      );
    }
    // unlock the YELLOW room at wave 5
    else if (globals.currentWave < 5){
      globals.pacman.position.setZ(
        Math.max(Math.min(barrier, globals.pacman.position.z), -entrance)
      );
    }
    else {
      globals.pacman.position.setZ(
        Math.max(Math.min(barrier, globals.pacman.position.z), -barrier)
      );
    }
    

    // hallways
    if (
      globals.pacman.position.z >=
        -consts.ARENA_SIZE / 2 - consts.HALLWAY_LENGTH &&
      globals.pacman.position.z <= -consts.ARENA_SIZE / 2
    ) {
      barrier = consts.DOOR_WIDTH / 2 - consts.PACMAN_BUFFER;
      globals.pacman.position.setX(
        Math.max(Math.min(barrier, globals.pacman.position.x), -barrier)
      );
    }
    if (
      globals.pacman.position.z <=
        consts.ARENA_SIZE / 2 + consts.HALLWAY_LENGTH &&
      globals.pacman.position.z >= consts.ARENA_SIZE / 2
    ) {
      barrier = consts.DOOR_WIDTH / 2 - consts.PACMAN_BUFFER;
      globals.pacman.position.setX(
        Math.max(Math.min(barrier, globals.pacman.position.x), -barrier)
      );
    }
  } else if (
    globals.pacman.position.z >=
      -consts.DOOR_WIDTH / 2 + consts.PACMAN_BUFFER &&
    globals.pacman.position.z <= consts.DOOR_WIDTH / 2 - consts.PACMAN_BUFFER
  ) {
    // central z tunnel

    barrier =
      consts.ARENA_SIZE / 2 +
      consts.HALLWAY_LENGTH +
      consts.BRANCH_SIZE -
      consts.PACMAN_BUFFER;

    // unlocking the RED room at wave 2
    if (globals.currentWave < 2) {
      globals.pacman.position.setX(
        Math.max(Math.min(entrance, globals.pacman.position.x), -entrance)
      );
    }
    // unlocking the YELLOW room at wave 4
    else if (globals.currentWave < 4){
      globals.pacman.position.setX(
        Math.max(Math.min(barrier, globals.pacman.position.x), -entrance)
      );
    }
    else {
      globals.pacman.position.setX(
        Math.max(Math.min(barrier, globals.pacman.position.x), -barrier)
      );
    }

    // hallways
    if (
      globals.pacman.position.x >=
        -consts.ARENA_SIZE / 2 - consts.HALLWAY_LENGTH &&
      globals.pacman.position.x <= -consts.ARENA_SIZE / 2
    ) {
      barrier = consts.DOOR_WIDTH / 2 - consts.PACMAN_BUFFER;
      globals.pacman.position.setZ(
        Math.max(Math.min(barrier, globals.pacman.position.z), -barrier)
      );
    }
    if (
      globals.pacman.position.x <=
        consts.ARENA_SIZE / 2 + consts.HALLWAY_LENGTH &&
      globals.pacman.position.x >= consts.ARENA_SIZE / 2
    ) {
      barrier = consts.DOOR_WIDTH / 2 - consts.PACMAN_BUFFER;
      globals.pacman.position.setZ(
        Math.max(Math.min(barrier, globals.pacman.position.z), -barrier)
      );
    }
  } else if (
    globals.pacman.position.x >=
      -consts.ARENA_SIZE / 2 - consts.HALLWAY_LENGTH &&
    globals.pacman.position.x <= -consts.ARENA_SIZE / 2
  ) {
    // hallways

    barrier = consts.DOOR_WIDTH / 2 - consts.PACMAN_BUFFER;
    globals.pacman.position.setZ(
      Math.max(Math.min(barrier, globals.pacman.position.z), -barrier)
    );
  } else if (
    globals.pacman.position.x <=
      consts.ARENA_SIZE / 2 + consts.HALLWAY_LENGTH &&
    globals.pacman.position.x >= consts.ARENA_SIZE / 2
  ) {
    barrier = consts.DOOR_WIDTH / 2 - consts.PACMAN_BUFFER;
    globals.pacman.position.setZ(
      Math.max(Math.min(barrier, globals.pacman.position.z), -barrier)
    );
  } else if (
    globals.pacman.position.z >=
      -consts.ARENA_SIZE / 2 - consts.HALLWAY_LENGTH &&
    globals.pacman.position.z <= -consts.ARENA_SIZE / 2
  ) {
    // hallways

    barrier = consts.DOOR_WIDTH / 2 - consts.PACMAN_BUFFER;
    globals.pacman.position.setX(
      Math.max(Math.min(barrier, globals.pacman.position.x), -barrier)
    );
  } else if (
    globals.pacman.position.z <=
      consts.ARENA_SIZE / 2 + consts.HALLWAY_LENGTH &&
    globals.pacman.position.z >= consts.ARENA_SIZE / 2
  ) {
    barrier = consts.DOOR_WIDTH / 2 - consts.PACMAN_BUFFER;
    globals.pacman.position.setX(
      Math.max(Math.min(barrier, globals.pacman.position.x), -barrier)
    );
  } else {
    let curRoom;
    for (const room of globals.rooms) {
      if (room.isInside(globals.pacman.position)) {
        curRoom = room;
        break;
      }
    }

    globals.pacman.position.setX(
      Math.max(
        Math.min(
          curRoom.maxX - consts.PACMAN_BUFFER,
          globals.pacman.position.x
        ),
        curRoom.minX + consts.PACMAN_BUFFER
      )
    );
    globals.pacman.position.setZ(
      Math.max(
        Math.min(
          curRoom.maxZ - consts.PACMAN_BUFFER,
          globals.pacman.position.z
        ),
        curRoom.minZ + consts.PACMAN_BUFFER
      )
    );
  }
};

export default handleMovement;
