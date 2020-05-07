import {Audio, Vector3} from 'three';

import globals from '../globals';

let handleAI = () => {
  // freeze ability active
  if (globals.freeze) {
    return;
  }

  for (let enemy of globals.enemies) {
    // increasing the opacity of the ghosts
    if (enemy.meshes !== undefined) {
      for (let msh of enemy.meshes) {
        if (msh.material !== undefined && msh.material.opacity == 1) {
          break;
        }
        if (msh.material !== undefined) {
          msh.material.opacity += 0.0008;
          msh.material.transparent = true;
        }
      }
    }

    // make occasional noise
    enemy.makeNoise();

    // ghosts float along sine wave
    enemy.position.y = -20 + Math.sin(globals.clock.getElapsedTime()*5)*enemy.hoverHeight;

    // determine what room pac-man is in
    let pacRoom;
    for (let room of globals.rooms) {
      if (room.isInside(globals.pacman.position))  {
        pacRoom = room;
        break;
      }
    }
    if (pacRoom == undefined) {
      for (let hall of globals.hallways) {
        if (hall.isInside(globals.pacman.position)) {
          pacRoom = hall;
          break;
        }
      }
    }

    // determine what room the ghost is in
    let enemyRoom;
    for (let room of globals.rooms) {
      if (room.isInside(enemy.position))  {
        enemyRoom = room;
        break;
      }
    }
    if (enemyRoom == undefined) {
      for (let hall of globals.hallways) {
        if (hall.isInside(enemy.position)) {
          enemyRoom = hall;
          break;
        }
      }
    }

    let vecDir;
    if (pacRoom === enemyRoom) {
      vecDir = globals.pacman.position.clone().sub(enemy.position).setY(0).normalize();
    }
    else if (enemyRoom != undefined){
      const MAIN_ZONE = 380;
      const BRANCH_ZONE = 620
      const ZONE_RADIUS = 20;
      switch(enemyRoom.id) {
        case 'room1': {
          let room1Main = new Vector3(MAIN_ZONE, 0, 0);
          let room1Branch = new Vector3(BRANCH_ZONE, 0, 0);
          if (enemy.position.clone().sub(room1Branch).setY(0).length() < ZONE_RADIUS)
            vecDir = room1Main.clone().sub(room1Branch).normalize();
          else
            vecDir = room1Branch.clone().sub(enemy.position).setY(0).normalize();
          break;
        }
        case 'room2': {
          let room2Main = new Vector3(0, 0, MAIN_ZONE);
          let room2Branch = new Vector3(0, 0, BRANCH_ZONE);
          if (enemy.position.clone().sub(room2Branch).setY(0).length() < ZONE_RADIUS)
            vecDir = room2Main.clone().sub(room2Branch).normalize();
          else
            vecDir = room2Branch.clone().sub(enemy.position).setY(0).normalize();
          break;
        }
        case 'room3': {
          let room3Main = new Vector3(-MAIN_ZONE, 0, 0);
          let room3Branch = new Vector3(-BRANCH_ZONE, 0, 0);
          if (enemy.position.clone().sub(room3Branch).setY(0).length() < ZONE_RADIUS)
            vecDir = room3Main.clone().sub(room3Branch).normalize();
          else
            vecDir = room3Branch.clone().sub(enemy.position).setY(0).normalize();
          break;
        }
        case 'room4': {
          let room4Main = new Vector3(0, 0, -MAIN_ZONE);
          let room4Branch = new Vector3(0, 0, -BRANCH_ZONE);
          if (enemy.position.clone().sub(room4Branch).setY(0).length() < ZONE_RADIUS)
            vecDir = room4Main.clone().sub(room4Branch).normalize();
          else
            vecDir = room4Branch.clone().sub(enemy.position).setY(0).normalize();
          break;
        }
        case 'main': {
          if (pacRoom.id === 'room1' || pacRoom.id === 'hallway1') {
            let room1Main = new Vector3(MAIN_ZONE, 0, 0);
            let room1Branch = new Vector3(BRANCH_ZONE, 0, 0);
            if (enemy.position.clone().sub(room1Main).setY(0).length() < ZONE_RADIUS)
              vecDir = room1Branch.clone().sub(room1Main).normalize();
            else
              vecDir = room1Main.clone().sub(enemy.position).setY(0).normalize();
          }
          else if (pacRoom.id === 'room2' || pacRoom.id === 'hallway2') {
            let room2Main = new Vector3(0, 0, MAIN_ZONE);
            let room2Branch = new Vector3(0, 0, BRANCH_ZONE);
            if (enemy.position.clone().sub(room2Main).setY(0).length() < ZONE_RADIUS)
              vecDir = room2Branch.clone().sub(room2Main).normalize();
            else
              vecDir = room2Main.clone().sub(enemy.position).setY(0).normalize();
          }
          else if (pacRoom.id === 'room3' || pacRoom.id === 'hallway3') {
            let room3Main = new Vector3(-MAIN_ZONE, 0, 0);
            let room3Branch = new Vector3(-BRANCH_ZONE, 0, 0);
            if (enemy.position.clone().sub(room3Main).setY(0).length() < ZONE_RADIUS)
              vecDir = room3Branch.clone().sub(room3Main).normalize();
            else
              vecDir = room3Main.clone().sub(enemy.position).setY(0).normalize();

          }
          else if (pacRoom.id === 'room4' || pacRoom.id === 'hallway4') {
            let room4Main = new Vector3(0, 0, -MAIN_ZONE);
            let room4Branch = new Vector3(0, 0, -BRANCH_ZONE);
            if (enemy.position.clone().sub(room4Main).setY(0).length() < ZONE_RADIUS)
              vecDir = room4Branch.clone().sub(room4Main).normalize();
            else
              vecDir = room4Main.clone().sub(enemy.position).setY(0).normalize();
          }
          break;
        }
        case 'hallway1': {
          if (pacRoom.id === 'room1') {
            vecDir = new Vector3(1, 0, 0);
          }
          else {
            vecDir = new Vector3(-1, 0, 0);
          }
          break;
        }
        case 'hallway2': {
          if (pacRoom.id === 'room2') {
            vecDir = new Vector3(0, 0, 1);
          }
          else {
            vecDir = new Vector3(0, 0, -1);
          }
          break;
        }
        case 'hallway3': {
          if (pacRoom.id === 'room3') {
            vecDir = new Vector3(-1, 0, 0);
          }
          else {
            vecDir = new Vector3(1, 0, 0);

          }
          break;
        }
        case 'hallway4': {
          if (pacRoom.id === 'room4') {
            vecDir = new Vector3(0, 0, -1);
          }
          else {
            vecDir = new Vector3(0, 0, 1);
          }
          break;
        }
        // ghosts stay still
        default: {
          vecDir = new Vector3();
        }
      }
    }
    else {
      vecDir = new Vector3();
      console.log('undefined?');
    }

    let testPosition = enemy.position.clone()
      .add(vecDir.clone().multiplyScalar(enemy.speed))
    if (testPosition.distanceTo(globals.pacman.position) > enemy.killDist) {
      enemy.position.add(vecDir.clone().multiplyScalar(enemy.speed));

      // make sure enemy faces Pacman
      let angle = new Vector3(0, 0, 1).angleTo(vecDir);
      if (globals.pacman.position.x - enemy.position.x < 0) {
        angle = Math.PI*2 - angle;
      }
      enemy.rotation.y = angle;
    }
    // damage applied
    else {
      globals.scene.remove(enemy);
      globals.enemies.delete(enemy);
      enemy.death();

      // invincible
      if (globals.star) {
        return;
      }

      // take damage
      globals.pacman.health--;
      if (globals.pacman.health <= 0) {
        // pacman dies
        globals.globalMusic.stop();
        let sound = new Audio(globals.listener);
        globals.audioLoader.load('./src/music/defeat.mp3', (buffer) => {
          sound.setBuffer(buffer);
          sound.setVolume(0.25);
          sound.play();
        });
        globals.gameOver = true;
      }
    }
  }
}

export default handleAI;