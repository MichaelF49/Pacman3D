import * as THREE from 'three';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';

import {Doorwall, Ghost, Hallway, Pacman, Pickup, Room} from './objects';
import consts from './consts'
import globals from './globals'

/**********************************************************
 * OTHER VARIABLES
 **********************************************************/
  let pacmanBuffer = 14;
  let ghostRadius = 15;

/**********************************************************
 * SCENE + CAMERA
 **********************************************************/
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  1,
  50000
);
let camPosition = new THREE.Vector3(0, 25, 70);
camera.position.add(camPosition);
camera.lookAt(0, 0, 0);
let scene = new THREE.Scene();

/**********************************************************
 * AUDIO
 **********************************************************/
let listener = new THREE.AudioListener();
camera.add(listener);
let audioLoader = new THREE.AudioLoader();

/**********************************************************
 * GLOBAL MUSIC
 **********************************************************/
let globalMusic = new THREE.Audio(listener);
audioLoader.load('./src/music/global_music.mp3', (buffer) => {
  globalMusic.setBuffer(buffer);
  globalMusic.setLoop(true);
  globalMusic.setVolume(0); // was 0.15
  globalMusic.play();
});

/**********************************************************
 * SKYBOX
 **********************************************************/
let sky1 = new THREE.TextureLoader().load('./src/images/skybox/sky1.jpg');
let sky2 = new THREE.TextureLoader().load('./src/images/skybox/sky2.jpg');
let skyTop = new THREE.TextureLoader().load('./src/images/skybox/sky_top.jpg');
let skyBot = new THREE.TextureLoader().load('./src/images/skybox/sky_bot.jpg');
let skyMaterial = [
  new THREE.MeshBasicMaterial({map: sky1, side: THREE.BackSide}),
  new THREE.MeshBasicMaterial({map: sky1, side: THREE.BackSide}),
  new THREE.MeshBasicMaterial({map: skyTop, side: THREE.BackSide}),
  new THREE.MeshBasicMaterial({map: skyBot, side: THREE.BackSide}),
  new THREE.MeshBasicMaterial({map: sky2, side: THREE.BackSide}),
  new THREE.MeshBasicMaterial({map: sky2, side: THREE.BackSide})
];
let skyboxGeo = new THREE.BoxGeometry(15000, 20000, 15000);
let skybox = new THREE.Mesh(skyboxGeo, skyMaterial);
skybox.position.set(0, -2000, 0);
scene.add(skybox);

/**********************************************************
 * PACMAN
 **********************************************************/
let pacman = new Pacman(scene, camera, listener);
pacman.position.y = -18;
pacman.rotation.y = Math.PI*1.5;
pacman.scale.multiplyScalar(10);
scene.add(pacman);

/**********************************************************
 *  ROOMS (FLOORS & WALLS)
 ************************************************************/
// parameters for which walls a room has
let sides = {
  right: false,
  left: false,
  up: false,
  down: false
};

// the main room
globals.rooms.push(new Room('main', consts.ARENA_SIZE, 0, 0, scene, sides));

// rooms that branch off, each missing a wall
sides.right = true;
sides.left = true;
sides.up = true;
globals.rooms.push(
  new Room('room1',
           consts.BRANCH_SIZE,
           consts.ARENA_SIZE/2 + consts.BRANCH_SIZE/2 + consts.HALLWAY_LENGTH,
           0,
           scene,
           sides)
);
globals.hallways.push(
  new Hallway('hallway1',
              consts.HALLWAY_LENGTH,
              consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH/2,
              0,
              scene,
              sides)
);

sides.left = false;
sides.down = true;
globals.rooms.push(
  new Room('room2',
           consts.BRANCH_SIZE,
           0,
           consts.ARENA_SIZE/2 + consts.BRANCH_SIZE/2 + consts.HALLWAY_LENGTH,
           scene,
           sides)
);
globals.hallways.push(
  new Hallway('hallway2',
              consts.HALLWAY_LENGTH,
              0,
              consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH/2,
              scene,
              sides)
);

sides.up = false;
sides.left = true;
globals.rooms.push(
  new Room('room3',
           consts.BRANCH_SIZE,
           -(consts.ARENA_SIZE/2 + consts.BRANCH_SIZE/2 + consts.HALLWAY_LENGTH),
           0,
           scene,
           sides
          )
);
globals.hallways.push(
  new Hallway('hallway3',
              consts.HALLWAY_LENGTH,
              -(consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH/2),
              0,
              scene,
              sides)
);


sides.right = false;
sides.up = true;
globals.rooms.push(
  new Room('room4',
           consts.BRANCH_SIZE,
           0,
           -(consts.ARENA_SIZE/2 + consts.BRANCH_SIZE/2 + consts.HALLWAY_LENGTH),
           scene,
           sides
          )
);
globals.hallways.push(
  new Hallway('hallway4',
              consts.HALLWAY_LENGTH,
              0,
              -(consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH/2),
              scene,
              sides)
);

/**********************************************************
 * DOORWAY WALLS
 **********************************************************/
let doorWalls = new Doorwall('doors', consts.ARENA_SIZE, consts.BRANCH_SIZE, 0, 0, scene);

/**********************************************************
 * LIGHTS
 **********************************************************/
let light = new THREE.PointLight(0xffffff, 0.2, 10000);
light.position.set(-consts.ARENA_SIZE/2, 1000, consts.ARENA_SIZE/2);
scene.add(light);
light = new THREE.PointLight(0xffffff, 0.2, 10000);
light.position.set(consts.ARENA_SIZE/2, 1000, consts.ARENA_SIZE/2);
scene.add(light);
light = new THREE.PointLight(0xffffff, 0.2, 10000);
light.position.set(consts.ARENA_SIZE, 1000, -consts.ARENA_SIZE/2);
scene.add(light);
light = new THREE.PointLight(0xffffff, 0.2, 10000);
light.position.set(-consts.ARENA_SIZE/2, 1000, -consts.ARENA_SIZE/2);
scene.add(light);
light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);

/**********************************************************
 * RENDERER
 **********************************************************/
let renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// composer
var composer = new EffectComposer(renderer);
var renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// if we wanted to implement another sort of thing like bloom

// var bloomPass =
//   new UnrealBloomPass(new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
// bloomPass.threshold = 0.5;
// bloomPass.strength = 0.6;
// bloomPass.radius = 0;
// composer.addPass( bloomPass );
/**********************************************************
 * CANVAS
 **********************************************************/
let canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas

/**********************************************************
 * CSS adjustments
 **********************************************************/
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

/**********************************************************
 * KEY HANDLERS
 **********************************************************/
let onKeyDown = (event) => {
  switch (event.keyCode) {
    case 87: {
      // w
      globals.moveForward = true;
      break;
    }
    case 65: {
      // a
      globals.moveLeft = true;
      break;
    }
    case 83: {
      // s
      globals.moveBackward = true;
      break;
    }
    case 68: {
      // d
      globals.moveRight = true;
      break;
    }
    case 32: {
      // space
      if (!globals.spaceDown && !globals.gameOver) {
        pacman.shoot();
        globals.spaceDown = true;
      }
      break;
    }
    case 49: {
      // 1
      pacman.switchFruit(1)
      break;
    }
    case 50: {
      // 2
      pacman.switchFruit(2)
      break;
    }
    case 51: {
      // 2
      pacman.switchFruit(3)
      break;
    }
  }
};

let onKeyUp = (event) => {
  switch (event.keyCode) {
    case 87: {
      // w
      globals.moveForward = false;
      break;
    }
    case 65: {
      // a
      globals.moveLeft = false;
      break;
    }
    case 83: {
      // s
      globals.moveBackward = false;
      break;
    }
    case 68: {
      // d
      globals.moveRight = false;
      break;
    }
    case 32: {
      // space
      globals.spaceDown = false;
      break;
    }
  }
};

// add key handlers
window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);

/**********************************************************
 * MOVEMENT HANDLER
 **********************************************************/
let handleMovement = () => {
	let delta = consts.CLOCK.getDelta(); // seconds
	let moveDistance = consts.PACMAN_SPEED*delta;
	let rotateAngle = consts.PACMAN_TURN_SPEED*delta;

  let forward_direction = Number(globals.moveForward) - Number(globals.moveBackward);
  let rotate_direction = Number(globals.moveRight) - Number(globals.moveLeft);

  // left/right rotation
  if (globals.moveLeft || globals.moveRight) {
    let q = new THREE.Quaternion();
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotateAngle*rotate_direction);

    camera.applyQuaternion(q);
    camera.position.sub(pacman.position);
    camera.position.applyQuaternion(q);
    camera.position.add(pacman.position);

    pacman.applyQuaternion(q);
  }

  // front/back movement
  if (globals.moveForward || globals.moveBackward) {
    let oldVec = pacman.position.clone();

    let vec = new THREE.Vector3().subVectors(pacman.position, camera.position);
    vec.setY(0).normalize().multiplyScalar(moveDistance*forward_direction);
    pacman.position.add(vec);

    // updates pac-man's position with respect to the boundaries
    updatePacPosition();

    let newVec = pacman.position.clone();
    let vecDiff = newVec.sub(oldVec);
    camera.position.add(vecDiff);
  }
}

let updatePacPosition = () => {
  let barrier;
  // central x tunnel
  if (pacman.position.x >= -consts.DOOR_WIDTH/2 + pacmanBuffer &&
      pacman.position.x <= consts.DOOR_WIDTH/2  - pacmanBuffer) {
    barrier = consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH + consts.BRANCH_SIZE - pacmanBuffer;
    pacman.position.setZ(Math.max(Math.min(barrier, pacman.position.z), -barrier));

    // hallways
    if (pacman.position.z >= -consts.ARENA_SIZE/2 - consts.HALLWAY_LENGTH &&
        pacman.position.z <= -consts.ARENA_SIZE/2) {
      barrier = consts.DOOR_WIDTH/2 - pacmanBuffer;
      pacman.position.setX(Math.max(Math.min(barrier, pacman.position.x), -barrier));
    }
    if (pacman.position.z <= consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH &&
        pacman.position.z >= consts.ARENA_SIZE/2) {
      barrier = consts.DOOR_WIDTH/2 - pacmanBuffer;
      pacman.position.setX(Math.max(Math.min(barrier, pacman.position.x), -barrier));
    }
  }
  // central z tunnel
  else if (pacman.position.z >= -consts.DOOR_WIDTH/2 + pacmanBuffer &&
           pacman.position.z <= consts.DOOR_WIDTH/2  - pacmanBuffer) {
    barrier = consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH + consts.BRANCH_SIZE - pacmanBuffer;
    pacman.position.setX(Math.max(Math.min(barrier, pacman.position.x), -barrier));

    // hallways
    if (pacman.position.x >= -consts.ARENA_SIZE/2 - consts.HALLWAY_LENGTH &&
        pacman.position.x <= -consts.ARENA_SIZE/2) {
      barrier = consts.DOOR_WIDTH/2 - pacmanBuffer;
      pacman.position.setZ(Math.max(Math.min(barrier, pacman.position.z), -barrier));
    }
    if (pacman.position.x <= consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH &&
        pacman.position.x >= consts.ARENA_SIZE/2) {
      barrier = consts.DOOR_WIDTH/2 - pacmanBuffer;
      pacman.position.setZ(Math.max(Math.min(barrier, pacman.position.z), -barrier));
    }
  }
  // hallways
  else if (pacman.position.x >= -consts.ARENA_SIZE/2 - consts.HALLWAY_LENGTH &&
            pacman.position.x <= -consts.ARENA_SIZE/2) {
    barrier = consts.DOOR_WIDTH/2 - pacmanBuffer;
    pacman.position.setZ(Math.max(Math.min(barrier, pacman.position.z), -barrier));
  }
  else if (pacman.position.x <= consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH &&
            pacman.position.x >= consts.ARENA_SIZE/2) {
    barrier = consts.DOOR_WIDTH/2 - pacmanBuffer;
    pacman.position.setZ(Math.max(Math.min(barrier, pacman.position.z), -barrier));
  }
  // hallways
  else if (pacman.position.z >= -consts.ARENA_SIZE/2 - consts.HALLWAY_LENGTH &&
            pacman.position.z <= -consts.ARENA_SIZE/2) {
    barrier = consts.DOOR_WIDTH/2 - pacmanBuffer;
    pacman.position.setX(Math.max(Math.min(barrier, pacman.position.x), -barrier));
  }
  else if (pacman.position.z <= consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH &&
            pacman.position.z >= consts.ARENA_SIZE/2) {
    barrier = consts.DOOR_WIDTH/2 - pacmanBuffer;
    pacman.position.setX(Math.max(Math.min(barrier, pacman.position.x), -barrier));
  }
  else {
    let curRoom;
    for (let room of globals.rooms) {
      if (room.isInside(pacman.position))  {
        curRoom = room;
        break;
      }
    }

    pacman.position.setX(
      Math.max(
        Math.min(curRoom.maxX - pacmanBuffer, pacman.position.x),
        curRoom.minX + pacmanBuffer
      )
    );
    pacman.position.setZ(
      Math.max(
        Math.min(curRoom.maxZ - pacmanBuffer, pacman.position.z),
        curRoom.minZ + pacmanBuffer
      )
    );
  }
}

/**********************************************************
 * SHOOTING HANDLER
 **********************************************************/
let handleShooting = () => {
  for (let projectile of pacman.projectiles) {
    // move projectile through scene
    let projectileVec = projectile.direction;
    projectile.position.add(projectileVec.clone().multiplyScalar(projectile.speed));

    // handle enemy collision
    for (let enemy of globals.enemies) {
      let hitDist = enemy.position.clone().setY(0).
        distanceTo(projectile.position.clone().setY(0));
      // enemy takes damage
      if (hitDist < 25) {
        scene.remove(projectile);
        pacman.projectiles.delete(projectile);
        enemy.health -= projectile.damage;

        // enemy has no health, kill and delete from scene
        if (enemy.health <= 0) {
          scene.remove(enemy);
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
        deleteProjectile(projectile, pacman, scene);
      }
      // hallways
      if (projectile.position.z >= -consts.ARENA_SIZE/2 - consts.HALLWAY_LENGTH &&
          projectile.position.z <= -consts.ARENA_SIZE/2) {
        barrier = consts.DOOR_WIDTH/2 - projectileBuffer;
        projectile.position.setX(Math.max(Math.min(barrier, projectile.position.x), -barrier));
        if (projectile.position.x !== oldPosition.x) {
          deleteProjectile(projectile, pacman, scene);
        }
      }
      if (projectile.position.z <= consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH &&
          projectile.position.z >= consts.ARENA_SIZE/2) {
        barrier = consts.DOOR_WIDTH/2 - projectileBuffer;
        projectile.position.setX(Math.max(Math.min(barrier, projectile.position.x), -barrier));
        if (projectile.position.x !== oldPosition.x) {
          deleteProjectile(projectile, pacman, scene);
        }
      }
    }
    // central z tunnel
    else if (projectile.position.z >= -consts.DOOR_WIDTH/2 + projectileBuffer &&
             projectile.position.z <= consts.DOOR_WIDTH/2 - projectileBuffer) {
      barrier = consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH + consts.BRANCH_SIZE - projectileBuffer;
      projectile.position.setX(Math.max(Math.min(barrier, projectile.position.x), -barrier));
      if (projectile.position.x !== oldPosition.x) {
        deleteProjectile(projectile, pacman, scene);
      }
      // hallways
      if (projectile.position.x >= -consts.ARENA_SIZE/2 - consts.HALLWAY_LENGTH &&
          projectile.position.x <= -consts.ARENA_SIZE/2) {
        barrier = consts.DOOR_WIDTH/2 - projectileBuffer;
        projectile.position.setZ(Math.max(Math.min(barrier, projectile.position.z), -barrier));
        if (projectile.position.z !== oldPosition.z) {
          deleteProjectile(projectile, pacman, scene);
        }
      }
      if (projectile.position.x <= consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH &&
          projectile.position.x >= consts.ARENA_SIZE/2) {
        barrier = consts.DOOR_WIDTH/2 - projectileBuffer;
        projectile.position.setZ(Math.max(Math.min(barrier, projectile.position.z), -barrier));
        if (projectile.position.z !== oldPosition.z) {
          deleteProjectile(projectile, pacman, scene);
        }
      }
    }
    // hallways
    else if (projectile.position.x >= -consts.ARENA_SIZE/2 - consts.HALLWAY_LENGTH &&
             projectile.position.x <= -consts.ARENA_SIZE/2) {
      barrier = consts.DOOR_WIDTH/2 - projectileBuffer;
      projectile.position.setZ(Math.max(Math.min(barrier, projectile.position.z), -barrier));
      if (projectile.position.z !== oldPosition.z) {
        deleteProjectile(projectile, pacman, scene);
      }
    }
    else if (projectile.position.x <= consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH &&
             projectile.position.x >= consts.ARENA_SIZE/2) {
      barrier = consts.DOOR_WIDTH/2 - projectileBuffer;
      projectile.position.setZ(Math.max(Math.min(barrier, projectile.position.z), -barrier));
      if (projectile.position.z !== oldPosition.z) {
        deleteProjectile(projectile, pacman, scene);
      }
    }
    // hallways
    else if (projectile.position.z >= -consts.ARENA_SIZE/2 - consts.HALLWAY_LENGTH &&
             projectile.position.z <= -consts.ARENA_SIZE/2) {
      barrier = consts.DOOR_WIDTH/2 - projectileBuffer;
      projectile.position.setX(Math.max(Math.min(barrier, projectile.position.x), -barrier));
      if (projectile.position.x !== oldPosition.x) {
        deleteProjectile(projectile, pacman, scene);
      }
    }
    else if (projectile.position.z <= consts.ARENA_SIZE/2 + consts.HALLWAY_LENGTH &&
             projectile.position.z >= consts.ARENA_SIZE/2) {
      barrier = consts.DOOR_WIDTH/2 - projectileBuffer;
      projectile.position.setX(Math.max(Math.min(barrier, projectile.position.x), -barrier));
      if (projectile.position.x !== oldPosition.x) {
        deleteProjectile(projectile, pacman, scene);
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
        deleteProjectile(projectile, pacman, scene);
      }

      projectile.position.setZ(
        Math.max(
          Math.min(curRoom.maxZ - projectileBuffer, projectile.position.z),
          curRoom.minZ + projectileBuffer
        )
      );
      if (projectile.position.z !== oldPosition.z) {
        deleteProjectile(projectile, pacman, scene);
      }
    }
  }
}

let deleteProjectile = (projectile, pacman, scene) => {
  let sound = new THREE.Audio(listener);
  audioLoader.load('./src/music/pop.mp3', (buffer) => {
    sound.setBuffer(buffer);
    sound.setVolume(0.05);
    sound.play();
  });
  scene.remove(projectile);
  pacman.projectiles.delete(projectile);
}

/**********************************************************
 * GAME WAVE HANDLER
 **********************************************************/
let handleWave = () => {
  if (globals.enemies.size === 0 && globals.currentWave < consts.WAVES.length) {
    // new wave should start, begin countdown
    if (!globals.startedWave) {
      globals.startedWave = true;
      globals.startTime = consts.CLOCK.getElapsedTime();
      return;
    }

    // wait for countdown to finish
    if (consts.CLOCK.getElapsedTime() - globals.startTime < consts.WAVE_RESET_TIME) {
      return;
    }
    // reset flag back
    globals.startedWave = false;

    // start new wave
    let sound = new THREE.Audio(listener);
    audioLoader.load('./src/music/wave_start.mp3', (buffer) => {
      sound.setBuffer(buffer);
      sound.setVolume(0.25);
      sound.play();
    });

    // spawn globals.enemies
    for (let i = 0; i < consts.WAVES[globals.currentWave]; i++) {
      let ghost = new Ghost(listener, globals.currentWave);
      ghost.scale.multiplyScalar(0.2);
      ghost.position.y -= 20;

      // spawn randomly around edges of arena such that ghosts are certain radius
      // away from pacman
      let randVec;
      do {
        // picking a room
        let room = globals.rooms[Math.floor(Math.random()*globals.rooms.length)];
        randVec = new THREE.Vector3(
          Math.random()*(room.maxX - room.minX - 2*ghostRadius) + room.minX + ghostRadius,
          0,
          Math.random()*(room.maxZ - room.minZ - 2*ghostRadius) + room.minZ + ghostRadius
        );
      } while (
        randVec.clone().add(ghost.position).sub(pacman.position).length() < consts.SAFE_RADIUS
      );
      ghost.position.add(randVec);

      // make sure enemy faces Pacman
      let vec = pacman.position.clone().sub(ghost.position).setY(0).normalize();
      let angle = new THREE.Vector3(0, 0, 1).angleTo(vec);
      if (pacman.position.x - ghost.position.x < 0) {
        angle = Math.PI*2 - angle;
      }
      ghost.rotation.y = angle;

      globals.enemies.add(ghost);
      scene.add(ghost);
    }

    globals.currentWave++;
  }
  // victory
  else if (globals.enemies.size === 0 && globals.currentWave === consts.WAVES.length) {
    globalMusic.stop();
    let sound = new THREE.Audio(listener);
    audioLoader.load('./src/music/victory.mp3', (buffer) => {
      sound.setBuffer(buffer);
      sound.setVolume(0.25);
      sound.play();
    });
    globals.gameOver = true;
  }
};

/**********************************************************
 * AI HANDLER
 **********************************************************/
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
    enemy.position.y = -20 + Math.sin(consts.CLOCK.getElapsedTime()*5)*enemy.hoverHeight;

    // determine what room pac-man is in
    let pacRoom;
    for (let room of globals.rooms) {
      if (room.isInside(pacman.position))  {
        pacRoom = room;
        break;
      }
    }
    if (pacRoom == undefined) {
      for (let hall of globals.hallways) {
        if (hall.isInside(pacman.position)) {
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
      vecDir = pacman.position.clone().sub(enemy.position).setY(0).normalize();
    }
    else if (enemyRoom != undefined){
      const MAIN_ZONE = 380;
      const BRANCH_ZONE = 620
      const ZONE_RADIUS = 20;
      switch(enemyRoom.id) {
        case "room1": {
          let room1Main = new THREE.Vector3(MAIN_ZONE, 0, 0);
          let room1Branch = new THREE.Vector3(BRANCH_ZONE, 0, 0);
          if (enemy.position.clone().sub(room1Branch).setY(0).length() < ZONE_RADIUS)
            vecDir = room1Main.clone().sub(room1Branch).normalize();
          else
            vecDir = room1Branch.clone().sub(enemy.position).setY(0).normalize();
          break;
        }
        case "room2": {
          let room2Main = new THREE.Vector3(0, 0, MAIN_ZONE);
          let room2Branch = new THREE.Vector3(0, 0, BRANCH_ZONE);
          if (enemy.position.clone().sub(room2Branch).setY(0).length() < ZONE_RADIUS)
            vecDir = room2Main.clone().sub(room2Branch).normalize();
          else
            vecDir = room2Branch.clone().sub(enemy.position).setY(0).normalize();
          break;
        }
        case "room3": {
          let room3Main = new THREE.Vector3(-MAIN_ZONE, 0, 0);
          let room3Branch = new THREE.Vector3(-BRANCH_ZONE, 0, 0);
          if (enemy.position.clone().sub(room3Branch).setY(0).length() < ZONE_RADIUS)
            vecDir = room3Main.clone().sub(room3Branch).normalize();
          else
            vecDir = room3Branch.clone().sub(enemy.position).setY(0).normalize();
          break;
        }
        case "room4": {
          let room4Main = new THREE.Vector3(0, 0, -MAIN_ZONE);
          let room4Branch = new THREE.Vector3(0, 0, -BRANCH_ZONE);
          if (enemy.position.clone().sub(room4Branch).setY(0).length() < ZONE_RADIUS)
            vecDir = room4Main.clone().sub(room4Branch).normalize();
          else
            vecDir = room4Branch.clone().sub(enemy.position).setY(0).normalize();
          break;
        }
        case "main": {
          if (pacRoom.id === "room1" || pacRoom.id === "hallway1") {
            let room1Main = new THREE.Vector3(MAIN_ZONE, 0, 0);
            let room1Branch = new THREE.Vector3(BRANCH_ZONE, 0, 0);
            if (enemy.position.clone().sub(room1Main).setY(0).length() < ZONE_RADIUS)
              vecDir = room1Branch.clone().sub(room1Main).normalize();
            else
              vecDir = room1Main.clone().sub(enemy.position).setY(0).normalize();
          }
          else if (pacRoom.id === "room2" || pacRoom.id === "hallway2") {
            let room2Main = new THREE.Vector3(0, 0, MAIN_ZONE);
            let room2Branch = new THREE.Vector3(0, 0, BRANCH_ZONE);
            if (enemy.position.clone().sub(room2Main).setY(0).length() < ZONE_RADIUS)
              vecDir = room2Branch.clone().sub(room2Main).normalize();
            else
              vecDir = room2Main.clone().sub(enemy.position).setY(0).normalize();
          }
          else if (pacRoom.id === "room3" || pacRoom.id === "hallway3") {
            let room3Main = new THREE.Vector3(-MAIN_ZONE, 0, 0);
            let room3Branch = new THREE.Vector3(-BRANCH_ZONE, 0, 0);
            if (enemy.position.clone().sub(room3Main).setY(0).length() < ZONE_RADIUS)
              vecDir = room3Branch.clone().sub(room3Main).normalize();
            else
              vecDir = room3Main.clone().sub(enemy.position).setY(0).normalize();

          }
          else if (pacRoom.id === "room4" || pacRoom.id === "hallway4") {
            let room4Main = new THREE.Vector3(0, 0, -MAIN_ZONE);
            let room4Branch = new THREE.Vector3(0, 0, -BRANCH_ZONE);
            if (enemy.position.clone().sub(room4Main).setY(0).length() < ZONE_RADIUS)
              vecDir = room4Branch.clone().sub(room4Main).normalize();
            else
              vecDir = room4Main.clone().sub(enemy.position).setY(0).normalize();
          }
          break;
        }
        case "hallway1": {
          if (pacRoom.id === "room1") {
            vecDir = new THREE.Vector3(1, 0, 0);
          }
          else {
            vecDir = new THREE.Vector3(-1, 0, 0);
          }
          break;
        }
        case "hallway2": {
          if (pacRoom.id === "room2") {
            vecDir = new THREE.Vector3(0, 0, 1);
          }
          else {
            vecDir = new THREE.Vector3(0, 0, -1);
          }
          break;
        }
        case "hallway3": {
          if (pacRoom.id === "room3") {
            vecDir = new THREE.Vector3(-1, 0, 0);
          }
          else {
            vecDir = new THREE.Vector3(1, 0, 0);

          }
          break;
        }
        case "hallway4": {
          if (pacRoom.id === "room4") {
            vecDir = new THREE.Vector3(0, 0, -1);
          }
          else {
            vecDir = new THREE.Vector3(0, 0, 1);
          }
          break;
        }
        // ghosts stay still
        default: {
          vecDir = new THREE.Vector3();
        }
      }
    }
    else {
      vecDir = new THREE.Vector3();
      console.log("undefined?");
    }

    let testPosition = enemy.position.clone()
      .add(vecDir.clone().multiplyScalar(enemy.speed))
    if (testPosition.distanceTo(pacman.position) > enemy.killDist) {
      enemy.position.add(vecDir.clone().multiplyScalar(enemy.speed));

      // make sure enemy faces Pacman
      let angle = new THREE.Vector3(0, 0, 1).angleTo(vecDir);
      if (pacman.position.x - enemy.position.x < 0) {
        angle = Math.PI*2 - angle;
      }
      enemy.rotation.y = angle;
    }
    // damage applied
    else {
      scene.remove(enemy);
      globals.enemies.delete(enemy);
      enemy.death();

      // invincible
      if (globals.star) {
        return;
      }

      // take damage
      pacman.health--;
      if (pacman.health <= 0) {
        // pacman dies
        globalMusic.stop();
        let sound = new THREE.Audio(listener);
        audioLoader.load('./src/music/defeat.mp3', (buffer) => {
          sound.setBuffer(buffer);
          sound.setVolume(0.25);
          sound.play();
        });
        globals.gameOver = true;
      }
    }
  }
}

/**********************************************************
 * PICKUPS HANDLER
 **********************************************************/
let handlePickups = () => {
  // Check timers
  if (globals.freeze &&
      consts.CLOCK.getElapsedTime() - globals.freezeStart > consts.FREEZE_TIME) {
    globals.freeze = false;
  }
  if (globals.star &&
      consts.CLOCK.getElapsedTime() - globals.starStart > consts.STAR_TIME) {
    globals.star = false;
  }

  // Spawn fruit
  if (consts.CLOCK.getElapsedTime() - globals.lastFruitSpawnTime > consts.FRUIT_SPAWN_TIME) {
    globals.lastFruitSpawnTime = consts.CLOCK.getElapsedTime();

    // Choose random non-cherry fruit to spawn
    let fruitIndex = Number.parseInt(Math.random()*(consts.FRUIT.length - 1)) + 1;
    let fruit = consts.FRUIT[fruitIndex],
        scale = consts.FRUIT_SCALE[fruit];

    // Create ammo Pickup object
    let pickup = new Pickup(fruit, 'ammo')
    pickup.scale.multiplyScalar(scale);
    let spawnPos = new THREE.Vector3(
      Math.random()*consts.ARENA_SIZE - consts.ARENA_SIZE/2,
      -20,
      Math.random()*consts.ARENA_SIZE - consts.ARENA_SIZE/2
    );
    pickup.position.add(spawnPos);

    scene.add(pickup)
    globals.pickups.add(pickup)
  }

  // Spawn powerup
  if (consts.CLOCK.getElapsedTime() - globals.lastPowerupSpawnTime > consts.POWERUP_SPAWN_TIME) {
    globals.lastPowerupSpawnTime = consts.CLOCK.getElapsedTime();

    // Choose random powerup to spawn
    let powerupIndex = parseInt(Math.random()*consts.POWERUP.length);
    let powerup = consts.POWERUP[powerupIndex],
        scale = consts.POWERUP_SCALE[powerup];

    // Create powerup Pickup object
    let pickup = new Pickup(powerup, 'powerup')
    pickup.scale.multiplyScalar(scale);
    let spawnPos = new THREE.Vector3(
      Math.random() * consts.ARENA_SIZE - consts.ARENA_SIZE/2,
      -20,
      Math.random() * consts.ARENA_SIZE - consts.ARENA_SIZE/2
    );
    pickup.position.add(spawnPos);

    scene.add(pickup);
    globals.pickups.add(pickup);
  }

  for (let pickup of globals.pickups) {
    let hitDist = pickup.position.clone().setY(0).
      distanceTo(pacman.position.clone().setY(0));
    if (hitDist < 25) {
      scene.remove(pickup);
      globals.pickups.delete(pickup);

      let sound = new THREE.Audio(listener);
      audioLoader.load('./src/music/pop.mp3', (buffer) => {
        sound.setBuffer(buffer);
        sound.setVolume(0.20);
        sound.play();
      });

      // ammo effect
      if (pickup.type == 'ammo') {
        pacman.ammo[pickup.name] =
          Math.min(consts.MAX_AMMO_CAPACITY, pacman.ammo[pickup.name] + consts.AMMO_INC);
      }

      // powerup effect
      if (pickup.type == 'powerup') {
        switch (pickup.name) {
          case 'freeze': {
            globals.freeze = true;
            globals.freezeStart = consts.CLOCK.getElapsedTime();
            break;
          }
          case 'star': {
            globals.star = true;
            globals.starStart = consts.CLOCK.getElapsedTime();
            break;
          }
        }
      }
    }
  }
}

/**********************************************************
 * RENDER HANDLER
 **********************************************************/
let onAnimationFrameHandler = (timeStamp) => {
  if (!globals.gameOver) {
    window.requestAnimationFrame(onAnimationFrameHandler);
    handleMovement();
    handleShooting();
    handleWave();
    handleAI();
    handlePickups();
    scene.update && scene.update(timeStamp);

    composer.render();
    // renderer.render(scene, camera);
  }
};
window.requestAnimationFrame(onAnimationFrameHandler);

/**********************************************************
 * RESIZE HANDLER
 **********************************************************/
let windowResizeHandler = () => {
  let {innerHeight, innerWidth} = window;
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);