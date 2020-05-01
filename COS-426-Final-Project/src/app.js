import * as THREE from 'three';
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls.js';

// scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();

scene.add(camera);
camera.position.set(0, 150, 300);
camera.lookAt(scene.position);

// character
const sphere_geometry = new THREE.SphereGeometry(15, 25, 25);
const sphere_material = new THREE.MeshBasicMaterial({color: 0xffff00});
const sphere = new THREE.Mesh(sphere_geometry, sphere_material);
scene.add(sphere);

// floor
const floor_geometry = new THREE.PlaneGeometry(750, 750, 10, 10);
const floor_material = new THREE.MeshBasicMaterial({color: 0x545aa7, side: THREE.DoubleSide});
const floor = new THREE.Mesh(floor_geometry, floor_material);
floor.rotation.x = Math.PI/2;
floor.position.y = -40;
scene.add(floor);

// renderer
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// canvas
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas

// CSS adjustments
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

const controls = new PointerLockControls(camera, document.body);
controls.unlock();
scene.add(controls.getObject());

// controls handlers
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
let prevTime = performance.now();

const onKeyDown = (event) => {
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

const onKeyUp = (event) => {
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
const onAnimationFrameHandler = (timeStamp) => {
  window.requestAnimationFrame(onAnimationFrameHandler);
  renderer.render(scene, camera);
  handleMovement();
  scene.update && scene.update(timeStamp);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
  const {innerHeight, innerWidth} = window;
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);

const handleMovement = () => {
  // movement
  const time = performance.now();
  const delta = (time - prevTime)/130;

  velocity.x -= velocity.x*10.0*delta;
  velocity.z -= velocity.z*10.0*delta;

  direction.z = Number(moveForward) - Number(moveBackward);
  direction.x = Number(moveRight) - Number(moveLeft);
  direction.normalize(); // this ensures consistent movements in all directions

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