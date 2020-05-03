import * as THREE from 'three';
import {Pacman} from './objects';

// distance vec from sphere to camera
const cam_vec = new THREE.Vector3(0, 25, 70);

// scene and camera
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 50000);
camera.position.multiplyScalar(0).add(cam_vec);
camera.lookAt(0, 0, 0);
let scene = new THREE.Scene();

// audio set up
let listener = new THREE.AudioListener();
camera.add(listener);
let audioLoader = new THREE.AudioLoader();

// music
let global_music = new THREE.Audio(listener);
audioLoader.load('./src/music/global_music.mp3', (buffer) => {
  global_music.setBuffer(buffer);
  global_music.setLoop(true);
  global_music.setVolume(0.20);
  // global_music.play();
});

// skybox
let sky_1 = new THREE.TextureLoader().load('./src/images/skybox/sky1.jpg');
let sky_2 = new THREE.TextureLoader().load('./src/images/skybox/sky2.jpg');
let sky_top = new THREE.TextureLoader().load('./src/images/skybox/sky_top.jpg');
let sky_bot = new THREE.TextureLoader().load('./src/images/skybox/sky_bot.jpg');
let sky_array = [];
sky_array.push(new THREE.MeshBasicMaterial({map: sky_1, side: THREE.BackSide}));
sky_array.push(new THREE.MeshBasicMaterial({map: sky_1, side: THREE.BackSide}));
sky_array.push(new THREE.MeshBasicMaterial({map: sky_top, side: THREE.BackSide}));
sky_array.push(new THREE.MeshBasicMaterial({map: sky_bot, side: THREE.BackSide}));
sky_array.push(new THREE.MeshBasicMaterial({map: sky_2, side: THREE.BackSide}));
sky_array.push(new THREE.MeshBasicMaterial({map: sky_2, side: THREE.BackSide}));
let skybox_geometry = new THREE.BoxGeometry(15000, 20000, 15000);
let skybox = new THREE.Mesh(skybox_geometry, sky_array);
skybox.position.set(0, -2000, 0);
scene.add(skybox);

// pacman
let pacman = new Pacman(scene, camera, listener, audioLoader);
pacman.position.y = -17;
pacman.rotation.y = Math.PI*1.5;
pacman.scale.multiplyScalar(10);
scene.add(pacman);

// floor
let floor_geometry = new THREE.PlaneGeometry(1500, 1500, 10, 10);
let floor_material = new THREE.MeshBasicMaterial({
  color: 0x545aa7,
  side: THREE.DoubleSide,
  transparent:true,
  opacity: 0.75
});
let floor = new THREE.Mesh(floor_geometry, floor_material);
floor.rotation.x = Math.PI/2;
floor.position.y = -30;
scene.add(floor);

// walls
let wall_material_1 = new THREE.MeshBasicMaterial({
  color: 0x8b0000,
  side: THREE.DoubleSide,
  transparent:true,
  opacity: 0.75
});
let wall_material_2 = new THREE.MeshBasicMaterial({
  color: 0xcfb53b,
  side: THREE.DoubleSide,
  transparent:true,
  opacity: 0.75
});
let wall_geometry = new THREE.PlaneGeometry(1500, 75, 75, 10);
let wall = new THREE.Mesh(wall_geometry, wall_material_1);
wall.rotation.y = Math.PI/2;
wall.position.y = 7.5;
wall.position.x = -750;
scene.add(wall);
wall = new THREE.Mesh(wall_geometry, wall_material_1);
wall.rotation.y = Math.PI/2;
wall.position.y = 7.5;
wall.position.x = 750;
scene.add(wall);
wall = new THREE.Mesh(wall_geometry, wall_material_2);
wall.position.y = 7.5;
wall.position.z = -750;
scene.add(wall);
wall = new THREE.Mesh(wall_geometry, wall_material_2);
wall.position.y = 7.5;
wall.position.z = 750;
scene.add(wall);

// light
let light = new THREE.PointLight(0xffffff, 0.2, 10000);
light.position.set(-750, 1000, 750);
scene.add(light);
light = new THREE.PointLight(0xffffff, 0.2, 10000);
light.position.set(750, 1000, 750);
scene.add(light);
light = new THREE.PointLight(0xffffff, 0.2, 10000);
light.position.set(750, 1000, -750);
scene.add(light);
light = new THREE.PointLight(0xffffff, 0.2, 10000);
light.position.set(-750, 1000, -750);
scene.add(light);
light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add( light );

// renderer
let renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// canvas
let canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas

// CSS adjustments
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// controls handlers
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let clock = new THREE.Clock();

// prevent repetitive fires
let space_down = false;

// key handlers
let onKeyDown = (event) => {
  switch (event.keyCode) {
    case 87: // w
      moveForward = true;
      break;
    case 65: // a
      moveLeft = true;
      break;
    case 83: // s
      moveBackward = true;
      break;
    case 68: // d
      moveRight = true;
      break;
    case 32: {
      // space
      if (space_down) {
        return;
      }
      pacman.shoot();
      space_down = true;
      break;
    }
  }
};
let onKeyUp = (event) => {
  switch (event.keyCode) {
    case 87: // w
      moveForward = false;
      break;
    case 65: // a
      moveLeft = false;
      break;
    case 83: // s
      moveBackward = false;
      break;
    case 68: // d
      moveRight = false;
      break;
    case 32: // space
      space_down = false;
      break;
  }
};
// add key handlers
document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);

// Render loop
let onAnimationFrameHandler = (timeStamp) => {
  window.requestAnimationFrame(onAnimationFrameHandler);
  handleMovement();
  handleShooting();
  handleRound();
  scene.update && scene.update(timeStamp);
  renderer.render(scene, camera);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
let windowResizeHandler = () => {
  let {innerHeight, innerWidth} = window;
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);

// movement
let handleMovement = () => {
	let delta = clock.getDelta(); // seconds.
	let moveDistance = 200*delta; // 300 pixels per second
	let rotateAngle = -Math.PI/2*delta; // pi/2 radians per second

  let forward_direction = Number(moveForward) - Number(moveBackward);
  let rotate_direction = Number(moveRight) - Number(moveLeft);

  if (moveLeft || moveRight) {
    let q = new THREE.Quaternion();
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotateAngle*rotate_direction);
    camera.applyQuaternion(q);
    camera.position.sub(pacman.position);
    camera.position.applyQuaternion(q);
    camera.position.add(pacman.position);
    
    pacman.applyQuaternion(q);
  }

  if (moveForward || moveBackward) {
    const vec = new THREE.Vector3().subVectors(pacman.position, camera.position);
    let sphere_vec = vec.clone().setY(0).normalize().multiplyScalar(moveDistance*forward_direction);
    pacman.position.add(sphere_vec);
    // check bounds of walls
    pacman.position.setX(Math.max(Math.min(734, pacman.position.x), -734));
    pacman.position.setZ(Math.max(Math.min(734, pacman.position.z), -734));

    vec.normalize().multiplyScalar(cam_vec.length());
    let new_cam_pos = new THREE.Vector3().subVectors(pacman.position, vec);

    camera.position.set(new_cam_pos.x, new_cam_pos.y, new_cam_pos.z);
  }
}

// shooting
let handleShooting = () => {
  for (let projectile of pacman.projectiles) {
    let projectile_vec = projectile.direction;
    projectile.position.add(projectile_vec.clone().multiplyScalar(0.5));

    // handle collision
    if (Math.abs(projectile.position.x) > 750 || Math.abs(projectile.position.z) > 750) {
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

// number of enemmies per wave
const waves = [5, 10, 20];
let enemies = new Set();
// handle a wave of enemies
let handleRound = () => {
  for (let i = 0; i < waves.length; i++) {
    for (let j = 0; k < waves[i]; j++) {
      // spawn enemy add to set
      // add enemy to scene
    }
  }
};
