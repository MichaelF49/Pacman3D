/* eslint-disable no-restricted-syntax */
import { Audio, Vector3 } from 'three';

import { DamageMP3, DefeatMP3 } from '../audio';
import { consts, globals } from '../global';
import handleKeys from './handleKeys';

const handleAI = () => {
  for (const enemy of globals.enemies) {
    // increasing the opacity of the ghosts
    if (enemy.meshes !== undefined) {
      for (const mesh of enemy.meshes) {
        if (mesh.material !== undefined && mesh.material.opacity === 1) {
          break;
        }
        if (mesh.material !== undefined) {
          mesh.material.opacity += 0.0008;
          mesh.material.transparent = true;
        }
      }
    }

    // make occasional noise
    enemy.makeNoise();

    // ghosts float along sine wave
    enemy.position.y =
      -20 +
      Math.sin((globals.clock.getElapsedTime() - globals.totalPausedTime) * 5) *
        enemy.hoverHeight;

    /** **********************************************************************
    PATHING AI
    - When ghosts are in the same room as Pac-man, path in the direction of Pac-man
    - Otherwise, path towards predefined "zones" until the ghost is in the same room
    as Pac-man
    - Given n branching rooms, the main room will have n main zones, each corresponding
    to a single branching room.
    - Each branching room has a single zone.
    - A unique hallway connects each branching room to the main room
    - In the documentation, room zone refers to the branching room zone and main zone
    refers to the main room zone
    ********************************************************************** */

    // determine what room pac-man is in
    let pacRoom;
    for (const room of globals.rooms) {
      if (room.isInside(globals.pacman.position)) {
        pacRoom = room;
        break;
      }
    }
    if (pacRoom === undefined) {
      for (const hall of globals.hallways) {
        if (hall.isInside(globals.pacman.position)) {
          pacRoom = hall;
          break;
        }
      }
    }

    // determine what room the ghost is in
    let enemyRoom;
    for (const room of globals.rooms) {
      if (room.isInside(enemy.position)) {
        enemyRoom = room;
        break;
      }
    }
    if (enemyRoom === undefined) {
      for (const hall of globals.hallways) {
        if (hall.isInside(enemy.position)) {
          enemyRoom = hall;
          break;
        }
      }
    }

    let vecDir;
    // If ghost is in same room as Pac-man, path towards Pac-man
    if (pacRoom === enemyRoom) {
      vecDir = globals.pacman.position
        .clone()
        .sub(enemy.position)
        .setY(0)
        .normalize();
    }
    // Ghost is not in same room as Pac-man
    else if (enemyRoom !== undefined) {
      // record constants for the pathing algorithm
      const { BRANCH_ZONE, MAIN_ZONE, ZONE_RADIUS } = consts;

      // determine path given the room id of the enemy
      switch (enemyRoom.id) {
        case 'room1': {
          const room1Main = new Vector3(MAIN_ZONE, 0, 0);
          const room1Branch = new Vector3(BRANCH_ZONE, 0, 0);
          // if in room zone, path toward the main zone, else path toward room_zone
          if (
            enemy.position.clone().sub(room1Branch).setY(0).length() <
            ZONE_RADIUS
          ) {
            vecDir = room1Main.clone().sub(room1Branch).normalize();
          } else {
            vecDir = room1Branch
              .clone()
              .sub(enemy.position)
              .setY(0)
              .normalize();
          }
          break;
        }
        case 'room2': {
          const room2Main = new Vector3(0, 0, MAIN_ZONE);
          const room2Branch = new Vector3(0, 0, BRANCH_ZONE);
          // if in room zone, path toward the main zone, else path toward room_zone
          if (
            enemy.position.clone().sub(room2Branch).setY(0).length() <
            ZONE_RADIUS
          ) {
            vecDir = room2Main.clone().sub(room2Branch).normalize();
          } else {
            vecDir = room2Branch
              .clone()
              .sub(enemy.position)
              .setY(0)
              .normalize();
          }
          break;
        }
        case 'room3': {
          const room3Main = new Vector3(-MAIN_ZONE, 0, 0);
          const room3Branch = new Vector3(-BRANCH_ZONE, 0, 0);
          // if in room zone, path toward the main zone, else path toward room_zone
          if (
            enemy.position.clone().sub(room3Branch).setY(0).length() <
            ZONE_RADIUS
          ) {
            vecDir = room3Main.clone().sub(room3Branch).normalize();
          } else {
            vecDir = room3Branch
              .clone()
              .sub(enemy.position)
              .setY(0)
              .normalize();
          }
          break;
        }
        case 'room4': {
          const room4Main = new Vector3(0, 0, -MAIN_ZONE);
          const room4Branch = new Vector3(0, 0, -BRANCH_ZONE);
          // if in room zone, path toward the main zone, else path toward room_zone
          if (
            enemy.position.clone().sub(room4Branch).setY(0).length() <
            ZONE_RADIUS
          ) {
            vecDir = room4Main.clone().sub(room4Branch).normalize();
          } else {
            vecDir = room4Branch
              .clone()
              .sub(enemy.position)
              .setY(0)
              .normalize();
          }
          break;
        }
        // path toward the main zone corresponding to the room/hallway Pac-man is in
        case 'main': {
          if (pacRoom.id === 'room1' || pacRoom.id === 'hallway1') {
            const room1Main = new Vector3(MAIN_ZONE, 0, 0);
            const room1Branch = new Vector3(BRANCH_ZONE, 0, 0);
            if (
              enemy.position.clone().sub(room1Main).setY(0).length() <
              ZONE_RADIUS
            ) {
              vecDir = room1Branch.clone().sub(room1Main).normalize();
            } else {
              vecDir = room1Main
                .clone()
                .sub(enemy.position)
                .setY(0)
                .normalize();
            }
          } else if (pacRoom.id === 'room2' || pacRoom.id === 'hallway2') {
            const room2Main = new Vector3(0, 0, MAIN_ZONE);
            const room2Branch = new Vector3(0, 0, BRANCH_ZONE);
            if (
              enemy.position.clone().sub(room2Main).setY(0).length() <
              ZONE_RADIUS
            ) {
              vecDir = room2Branch.clone().sub(room2Main).normalize();
            } else {
              vecDir = room2Main
                .clone()
                .sub(enemy.position)
                .setY(0)
                .normalize();
            }
          } else if (pacRoom.id === 'room3' || pacRoom.id === 'hallway3') {
            const room3Main = new Vector3(-MAIN_ZONE, 0, 0);
            const room3Branch = new Vector3(-BRANCH_ZONE, 0, 0);
            if (
              enemy.position.clone().sub(room3Main).setY(0).length() <
              ZONE_RADIUS
            ) {
              vecDir = room3Branch.clone().sub(room3Main).normalize();
            } else {
              vecDir = room3Main
                .clone()
                .sub(enemy.position)
                .setY(0)
                .normalize();
            }
          } else if (pacRoom.id === 'room4' || pacRoom.id === 'hallway4') {
            const room4Main = new Vector3(0, 0, -MAIN_ZONE);
            const room4Branch = new Vector3(0, 0, -BRANCH_ZONE);
            if (
              enemy.position.clone().sub(room4Main).setY(0).length() <
              ZONE_RADIUS
            ) {
              vecDir = room4Branch.clone().sub(room4Main).normalize();
            } else {
              vecDir = room4Main
                .clone()
                .sub(enemy.position)
                .setY(0)
                .normalize();
            }
          }
          break;
        }
        // If Pac-man is in the room, path toward the room zone. Else, path toward the main zone
        case 'hallway1': {
          if (pacRoom.id === 'room1') {
            vecDir = new Vector3(1, 0, 0);
          } else {
            vecDir = new Vector3(-1, 0, 0);
          }
          break;
        }
        case 'hallway2': {
          if (pacRoom.id === 'room2') {
            vecDir = new Vector3(0, 0, 1);
          } else {
            vecDir = new Vector3(0, 0, -1);
          }
          break;
        }
        case 'hallway3': {
          if (pacRoom.id === 'room3') {
            vecDir = new Vector3(-1, 0, 0);
          } else {
            vecDir = new Vector3(1, 0, 0);
          }
          break;
        }
        case 'hallway4': {
          if (pacRoom.id === 'room4') {
            vecDir = new Vector3(0, 0, -1);
          } else {
            vecDir = new Vector3(0, 0, 1);
          }
          break;
        }
        // ghosts stay still
        default: {
          vecDir = new Vector3();
        }
      }
    } else {
      // error
      vecDir = new Vector3();
    }

    const testPosition = enemy.position
      .clone()
      .add(vecDir.clone().multiplyScalar(enemy.speed));
    if (testPosition.distanceTo(globals.pacman.position) > enemy.killDist) {
      if (!globals.freeze) {
        enemy.position.add(vecDir.clone().multiplyScalar(enemy.speed));
      }

      // make sure enemy faces Pacman
      let angle = new Vector3(0, 0, 1).angleTo(vecDir);
      if (globals.pacman.position.x - enemy.position.x < 0) {
        angle = Math.PI * 2 - angle;
      }
      enemy.rotation.y = angle;
    } else {
      // damage applied
      enemy.death();
      globals.updateGameProps();

      // invincible
      if (globals.star) {
        return;
      }

      // take damage
      globals.pacman.health -= 1;
      globals.updateHeartsAndPowerup();
      if (globals.pacman.health <= 0) {
        // pacman dies
        globals.globalMusic.stop();
        const sound = new Audio(globals.listener);
        globals.audioLoader.load(DefeatMP3, (buffer) => {
          sound.setBuffer(buffer);
          sound.setVolume(0.25);
          sound.play();
        });

        globals.scene.remove(globals.pacman);

        globals.defeat = true;
        globals.gameOverTime = globals.clock.getElapsedTime();

        // remove key handlers
        handleKeys(false);
      } else {
        const sound = new Audio(globals.listener);
        globals.audioLoader.load(DamageMP3, (buffer) => {
          sound.setBuffer(buffer);
          sound.setVolume(0.3);
          sound.play();
        });
      }
    }
  }
};

export default handleAI;
