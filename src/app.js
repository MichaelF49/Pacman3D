import * as THREE from 'three';
import {Pacman, Ghost} from './objects';

/**********************************************************
 * OTHER GLOBAL VARIABLES
 **********************************************************/
// keyboard control variables
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let spaceDown = false; // prevent repetitive fires

// for handling velocity
let clock = new THREE.Clock();

// enemy waves
let waves = [3, 6, 12];
let enemies = new Set();
let currentWave = 0;
let startedRound = false;
let startTime = 0;

let arenaSize = 1500.0;

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
  globalMusic.setVolume(0.15);
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
 * FLOOR
 **********************************************************/
let floorGeo = new THREE.PlaneGeometry(arenaSize, arenaSize, 10, 10);
let floorMaterial = new THREE.MeshBasicMaterial({
  color: 0x1974d2,
  side: THREE.DoubleSide,
  transparent:true,
  opacity: 0.6,
});
let floor = new THREE.Mesh(floorGeo, floorMaterial);
floor.rotation.x = Math.PI/2;
floor.position.y = -30;
scene.add(floor);

/**********************************************************
 * WALLS
 **********************************************************/
let wallMaterial1 = new THREE.MeshBasicMaterial({
  color: 0x8b0000,
  side: THREE.DoubleSide,
  wireframe: true
});
let wallMaterial2 = new THREE.MeshBasicMaterial({
  color: 0xcfb53b,
  side: THREE.DoubleSide,
  wireframe: true
});
let wallGeo = new THREE.PlaneGeometry(arenaSize, 75, 75, 10);
let wall = new THREE.Mesh(wallGeo, wallMaterial1);
wall.rotation.y = Math.PI/2;
wall.position.y = 7.5;
wall.position.x = -arenaSize/2;
scene.add(wall);
wall = new THREE.Mesh(wallGeo, wallMaterial1);
wall.rotation.y = Math.PI/2;
wall.position.y = 7.5;
wall.position.x = arenaSize/2;
scene.add(wall);
wall = new THREE.Mesh(wallGeo, wallMaterial2);
wall.position.y = 7.5;
wall.position.z = -arenaSize/2;
scene.add(wall);
wall = new THREE.Mesh(wallGeo, wallMaterial2);
wall.position.y = 7.5;
wall.position.z = arenaSize/2;
scene.add(wall);

/**********************************************************
 * LIGHTS
 **********************************************************/
let light = new THREE.PointLight(0xffffff, 0.2, 10000);
light.position.set(-arenaSize/2, 1000, arenaSize/2);
scene.add(light);
light = new THREE.PointLight(0xffffff, 0.2, 10000);
light.position.set(arenaSize/2, 1000, arenaSize/2);
scene.add(light);
light = new THREE.PointLight(0xffffff, 0.2, 10000);
light.position.set(arenaSize, 1000, -arenaSize/2);
scene.add(light);
light = new THREE.PointLight(0xffffff, 0.2, 10000);
light.position.set(-arenaSize/2, 1000, -arenaSize/2);
scene.add(light);
light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add( light );

/**********************************************************
 * RENDERER
 **********************************************************/
let renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

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
 * KEY HANDLER
 **********************************************************/
let onKeyDown = (event) => {
  switch (event.keyCode) {
    case 87: {
      // w
      moveForward = true;
      break;
    }
    case 65: {
      // a
      moveLeft = true;
      break;
    }
    case 83: {
      // s
      moveBackward = true;
      break;
    }
    case 68: {
      // d
      moveRight = true;
      break;
    }
    case 32: {
      // space
      if (!spaceDown) {
        pacman.shoot();
        spaceDown = true;
      }
      break;
    }
  }
};

let onKeyUp = (event) => {
  switch (event.keyCode) {
    case 87: {
      // w
      moveForward = false;
      break;
    }
    case 65: {
      // a
      moveLeft = false;
      break;
    }
    case 83: {
      // s
      moveBackward = false;
      break;
    }
    case 68: {
      // d
      moveRight = false;
      break;
    }
    case 32: {
      // space
      // d
      spaceDown = false;
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
	let delta = clock.getDelta(); // seconds
	let moveDistance = 200*delta; // 200 pixels per s
	let rotateAngle = -Math.PI/2*delta; // pi/2 radians per s

  let forward_direction = Number(moveForward) - Number(moveBackward);
  let rotate_direction = Number(moveRight) - Number(moveLeft);

  // left/right rotation
  if (moveLeft || moveRight) {
    let q = new THREE.Quaternion();
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotateAngle*rotate_direction);

    camera.applyQuaternion(q);
    camera.position.sub(pacman.position);
    camera.position.applyQuaternion(q);
    camera.position.add(pacman.position);

    pacman.applyQuaternion(q);
  }

  // front/back movement
  if (moveForward || moveBackward) {
    let oldVec = pacman.position.clone();

    let vec = new THREE.Vector3().subVectors(pacman.position, camera.position);
    vec.setY(0).normalize().multiplyScalar(moveDistance*forward_direction);
    pacman.position.add(vec);

    // check bounds of walls
    let barrier = arenaSize/2 - 14;
    pacman.position.setX(Math.max(Math.min(barrier, pacman.position.x), -barrier));
    pacman.position.setZ(Math.max(Math.min(barrier, pacman.position.z), -barrier));

    let newVec = pacman.position.clone();
    let vecDiff = newVec.sub(oldVec);
    camera.position.add(vecDiff);
  }
}

/**********************************************************
 * SHOOTING HANDLER
 **********************************************************/
let handleShooting = () => {
  for (let projectile of pacman.projectiles) {
    let projectileVec = projectile.direction;
    projectile.position.add(projectileVec.clone().multiplyScalar(0.35));

    // handle collision
    if (Math.abs(projectile.position.x) > arenaSize/2 ||
        Math.abs(projectile.position.z) > arenaSize/2) {
      let sound = new THREE.Audio(listener);
      audioLoader.load('./src/music/pop.mp3', (buffer) => {
        sound.setBuffer(buffer);
        sound.setVolume(0.05);
        sound.play();
      });
      scene.remove(projectile);
      pacman.projectiles.delete(projectile);
    }
  }
}

/**********************************************************
 * ENEMY WAVE HANDLERS
 **********************************************************/
let handleRound = () => {
  if (enemies.size === 0 && currentWave < waves.length) {
    if (!startedRound) {
      startedRound = true;
      startTime = clock.getElapsedTime();
      return;
    }

    if (clock.getElapsedTime() - startTime > 10) {
      startedRound = false;
    }

    for (let i = 0; i < waves[currentWave]; i++) {
      let ghost = new Ghost();
      ghost.scale.multiplyScalar(16);
      ghost.position.x -= 30;
      ghost.position.y -= 32;
      ghost.position.z -= 40;

      scene.add(ghost);
      enemies.add(ghost);
    }

    currentWave++;
  } else if (enemies.size === 0 && currentWave === waves.length) {
    // bear game!
  }
};

/**********************************************************
 * RENDER HANDLER
 **********************************************************/
let onAnimationFrameHandler = (timeStamp) => {
  window.requestAnimationFrame(onAnimationFrameHandler);
  handleMovement();
  handleShooting();
  handleRound();
  scene.update && scene.update(timeStamp);
  renderer.render(scene, camera);
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
