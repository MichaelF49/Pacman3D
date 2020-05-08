import {Quaternion, Vector3} from 'three';

import consts from '../consts';
import globals from '../globals';

let handleMovement = () => {
  let delta = globals.clock.getDelta(); // seconds
  let moveDistance = consts.PACMAN_SPEED*delta;
  let rotateAngle = consts.PACMAN_TURN_SPEED*delta;

  let forward_direction = Number(globals.moveForward) - Number(globals.moveBackward);
  let rotate_direction = Number(globals.moveRight) - Number(globals.moveLeft);

  // left/right rotation
  if (globals.moveLeft || globals.moveRight) {
    let q = new Quaternion();
    q.setFromAxisAngle(new Vector3(0, 1, 0), rotateAngle*rotate_direction);

    globals.camera.applyQuaternion(q);
    globals.camera.position.sub(globals.pacman.position);
    globals.camera.position.applyQuaternion(q);
    globals.camera.position.add(globals.pacman.position);

    globals.pacman.applyQuaternion(q);
  }

  // front/back movement
  if (globals.moveForward || globals.moveBackward) {
    let oldVec = globals.pacman.position.clone();

    let vec = new Vector3().subVectors(globals.pacman.position, globals.camera.position);
    vec.setY(0).normalize().multiplyScalar(moveDistance*forward_direction);
    globals.pacman.position.add(vec);

    // updates pac-man's position with respect to the boundaries
    updatePacPosition();

    let newVec = globals.pacman.position.clone();
    let vecDiff = newVec.sub(oldVec);
    globals.camera.position.add(vecDiff);
  }
}

let updatePacPosition = () => {
  let barrier;
  // central x tunnel
  if (globals.pacman.position.x >= -consts.DOOR_WIDTH/2 + consts.PACMAN_BUFFER &&
      globals.pacman.position.x <= consts.DOOR_WIDTH/2  - consts.PACMAN_BUFFER) {
    barrier = consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH + consts.BRANCH_SIZE -
      consts.PACMAN_BUFFER;
    globals.pacman.position.setZ(
      Math.max(Math.min(barrier, globals.pacman.position.z), -barrier)
    );

    // hallways
    if (globals.pacman.position.z >= -consts.ARENA_SIZE/2 - consts.HALLWAY_LENGTH &&
        globals.pacman.position.z <= -consts.ARENA_SIZE/2) {
      barrier = consts.DOOR_WIDTH/2 - consts.PACMAN_BUFFER;
      globals.pacman.position.setX(
        Math.max(Math.min(barrier, globals.pacman.position.x), -barrier)
      );
    }
    if (globals.pacman.position.z <= consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH &&
        globals.pacman.position.z >= consts.ARENA_SIZE/2) {
      barrier = consts.DOOR_WIDTH/2 - consts.PACMAN_BUFFER;
      globals.pacman.position.setX(
        Math.max(Math.min(barrier, globals.pacman.position.x), -barrier)
      );
    }
  }
  // central z tunnel
  else if (globals.pacman.position.z >= -consts.DOOR_WIDTH/2 + consts.PACMAN_BUFFER &&
           globals.pacman.position.z <= consts.DOOR_WIDTH/2  - consts.PACMAN_BUFFER) {
    barrier = consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH + consts.BRANCH_SIZE -
      consts.PACMAN_BUFFER;
    globals.pacman.position.setX(
      Math.max(Math.min(barrier, globals.pacman.position.x), -barrier)
    );

    // hallways
    if (globals.pacman.position.x >= -consts.ARENA_SIZE/2 - consts.HALLWAY_LENGTH &&
        globals.pacman.position.x <= -consts.ARENA_SIZE/2) {
      barrier = consts.DOOR_WIDTH/2 - consts.PACMAN_BUFFER;
      globals.pacman.position.setZ(
        Math.max(Math.min(barrier, globals.pacman.position.z), -barrier)
      );
    }
    if (globals.pacman.position.x <= consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH &&
        globals.pacman.position.x >= consts.ARENA_SIZE/2) {
      barrier = consts.DOOR_WIDTH/2 - consts.PACMAN_BUFFER;
      globals.pacman.position.setZ(
        Math.max(Math.min(barrier, globals.pacman.position.z), -barrier)
      );
    }
  }
  // hallways
  else if (globals.pacman.position.x >= -consts.ARENA_SIZE/2 - consts.HALLWAY_LENGTH &&
           globals.pacman.position.x <= -consts.ARENA_SIZE/2) {
    barrier = consts.DOOR_WIDTH/2 - consts.PACMAN_BUFFER;
    globals.pacman.position.setZ(
      Math.max(Math.min(barrier, globals.pacman.position.z), -barrier)
    );
  }
  else if (globals.pacman.position.x <= consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH &&
           globals.pacman.position.x >= consts.ARENA_SIZE/2) {
    barrier = consts.DOOR_WIDTH/2 - consts.PACMAN_BUFFER;
    globals.pacman.position.setZ(
      Math.max(Math.min(barrier, globals.pacman.position.z), -barrier)
    );
  }
  // hallways
  else if (globals.pacman.position.z >= -consts.ARENA_SIZE/2 - consts.HALLWAY_LENGTH &&
           globals.pacman.position.z <= -consts.ARENA_SIZE/2) {
    barrier = consts.DOOR_WIDTH/2 - consts.PACMAN_BUFFER;
    globals.pacman.position.setX(
      Math.max(Math.min(barrier, globals.pacman.position.x), -barrier)
    );
  }
  else if (globals.pacman.position.z <= consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH &&
           globals.pacman.position.z >= consts.ARENA_SIZE/2) {
    barrier = consts.DOOR_WIDTH/2 - consts.PACMAN_BUFFER;
    globals.pacman.position.setX(
      Math.max(Math.min(barrier, globals.pacman.position.x), -barrier)
    );
  }
  else {
    let curRoom;
    for (let room of globals.rooms) {
      if (room.isInside(globals.pacman.position)) {
        curRoom = room;
        break;
      }
    }

    globals.pacman.position.setX(
      Math.max(
        Math.min(curRoom.maxX - consts.PACMAN_BUFFER, globals.pacman.position.x),
        curRoom.minX + consts.PACMAN_BUFFER
      )
    );
    globals.pacman.position.setZ(
      Math.max(
        Math.min(curRoom.maxZ - consts.PACMAN_BUFFER, globals.pacman.position.z),
        curRoom.minZ + consts.PACMAN_BUFFER
      )
    );
  }
};

export default handleMovement;