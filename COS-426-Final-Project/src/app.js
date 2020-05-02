import * as THREE from 'three';

// distance vec from sphere to camera
const cam_vec = new THREE.Vector3(0, 40, 80);

// scene and camera
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 50000);
camera.position.multiplyScalar(0).add(cam_vec);
camera.lookAt(0, 0, 0);

let scene = new THREE.Scene();
scene.background = new THREE.Color(0x6699cc);

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
let skybox_geometry = new THREE.BoxGeometry(10000, 10000, 10000);
let skybox = new THREE.Mesh(skybox_geometry, sky_array);
skybox.position.set(0, 0, 0);
scene.add(skybox);

// character
let sphere_geometry = new THREE.SphereGeometry(15, 25, 25);
let sphere_material = new THREE.MeshBasicMaterial({color: 0xffff00});
let sphere = new THREE.Mesh(sphere_geometry, sphere_material);
scene.add(sphere);

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
	let delta = clock.getDelta(); // seconds.
	let moveDistance = 300*delta; // 300 pixels per second
	let rotateAngle = -Math.PI/2*delta; // pi/2 radians per second

  let forward_direction = Number(moveForward) - Number(moveBackward);
  let rotate_direction = Number(moveRight) - Number(moveLeft);

  if (moveLeft || moveRight) {
    let q = new THREE.Quaternion();
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotateAngle*rotate_direction);
    camera.applyQuaternion(q);
    camera.position.sub(sphere.position);
    camera.position.applyQuaternion(q);
    camera.position.add(sphere.position);
  }

  if (moveForward || moveBackward) {
    const vec = new THREE.Vector3().subVectors(sphere.position, camera.position);
    let sphere_vec = vec.clone().setY(0).normalize().multiplyScalar(moveDistance*forward_direction);
    sphere.position.add(sphere_vec);
    // check bounds of walls
    sphere.position.setX(Math.max(Math.min(733, sphere.position.x), -733));
    sphere.position.setZ(Math.max(Math.min(733, sphere.position.z), -733));

    vec.normalize().multiplyScalar(cam_vec.length());
    let new_cam_pos = new THREE.Vector3().subVectors(sphere.position, vec);

    camera.position.set(new_cam_pos.x, new_cam_pos.y, new_cam_pos.z);
  }
}
