import * as THREE from 'three';
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls.js';

// scene and camera
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
camera.position.set(0, 125, 100);
camera.lookAt(0, 0, 0);

let scene = new THREE.Scene();
scene.background = new THREE.Color(0x6699cc);

// controls
let controls = new PointerLockControls(camera, document.body);
scene.add(controls.getObject());

// character
let sphere_geometry = new THREE.SphereGeometry(15, 25, 25);
let sphere_material = new THREE.MeshBasicMaterial({color: 0xffff00});
let sphere = new THREE.Mesh(sphere_geometry, sphere_material);
scene.add(sphere);

// floor
let floor_geometry = new THREE.PlaneGeometry(750, 750, 10, 10);
let floor_material = new THREE.MeshBasicMaterial({color: 0x545aa7, side: THREE.DoubleSide});
let floor = new THREE.Mesh(floor_geometry, floor_material);
floor.rotation.x = Math.PI/2;
floor.position.y = -40;
scene.add(floor);

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
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
let prevTime = performance.now();

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
  }
};
document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);

// Render loop
let onAnimationFrameHandler = (timeStamp) => {
  window.requestAnimationFrame(onAnimationFrameHandler);
  handleMovement();
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
  let time = performance.now();
  let delta = (time - prevTime)/130;

  velocity.x -= velocity.x*10.0*delta;
  velocity.z -= velocity.z*10.0*delta;

  direction.z = Number(moveForward) - Number(moveBackward);
  direction.x = Number(moveRight) - Number(moveLeft);
  direction.normalize(); // ensures consistent movement in all directions

  if (moveForward || moveBackward)
    velocity.z -= direction.z*400.0*delta;
  if (moveLeft || moveRight)
    velocity.x -= direction.x*400.0*delta;

  controls.moveRight(-velocity.x*delta);
  sphere.position.x += -velocity.x*delta;
  controls.moveForward(-velocity.z*delta);
  sphere.position.z += velocity.z*delta;

  prevTime = time;
}
