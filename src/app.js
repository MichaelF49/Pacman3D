import * as THREE from 'three';
import {Pacman, Ghost, Pickup} from './objects';
import consts from './consts'

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

// game properties
let gameOver = false;
let waveRestTime = consts.WAVE_RESET_TIME; 
let waves = consts.WAVES;
let enemies = new Set();
let currentWave = 0;
let startedRound = false;
let startTime = 0;
let pickups = new Set();
let betweenfruitSpawnTime = 1;  // 1 s bewteen fruit spawns
let lastFruitSpawnTime = 0;
let betweenPowerupSpawnTime = 1;  // 1 s bewteen fruit spawns
let lastPowerupSpawnTime = 0;
let freeze = false
let freezeStart = 0

let arenaSize = consts.ARENA_SIZE;

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
 * KEY HANDLERS
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
      if (!spaceDown && !gameOver) {
        pacman.shoot();
        spaceDown = true;
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
    projectile.position.add(projectileVec.clone().multiplyScalar(projectile.speed));

    for (let enemy of enemies) {
      let hitDist = enemy.position.clone().setY(0).
        distanceTo(projectile.position.clone().setY(0));
      if (hitDist < 25) {
        scene.remove(enemy);
        scene.remove(projectile);
        pacman.projectiles.delete(projectile);
        enemies.delete(enemy);
        enemy.death();
      }
    }

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
 * GAME ROUND HANDLER
 **********************************************************/
let handleRound = () => {
  if (enemies.size === 0 && currentWave < waves.length) {
    // new round should start, begin countdown
    if (!startedRound) {
      startedRound = true;
      startTime = clock.getElapsedTime();
      return;
    }

    // wait for countdown to finish
    if (clock.getElapsedTime() - startTime < waveRestTime) {
      return;
    }
    // reset flag back
    startedRound = false;

    // start new round
    let sound = new THREE.Audio(listener);
    audioLoader.load('./src/music/round_start.mp3', (buffer) => {
      sound.setBuffer(buffer);
      sound.setVolume(0.25);
      sound.play();
    });

    for (let i = 0; i < waves[currentWave]; i++) {
      let ghost = new Ghost(listener, clock);
      ghost.scale.multiplyScalar(0.2);
      ghost.position.y -= 5;
      
      // spawn randomly around edges of arena
      let randVec = new THREE.Vector3(
        (Math.random() < 0.5 ? -1 : 1)*
          (Math.floor(Math.random()*arenaSize/4 - 15) + arenaSize/4),
        0,
        (Math.random() < 0.5 ? -1 : 1)*
          (Math.floor(Math.random()*arenaSize/4 - 15) + arenaSize/4)
      );
      ghost.position.add(randVec);

      enemies.add(ghost);
      scene.add(ghost);
    }

    currentWave++;
  } else if (enemies.size === 0 && currentWave === waves.length) {
    // victory
    globalMusic.stop();
    let sound = new THREE.Audio(listener);
    audioLoader.load('./src/music/victory.mp3', (buffer) => {
      sound.setBuffer(buffer);
      sound.setVolume(0.25);
      sound.play();
    });
    gameOver = true;
  }
};

/**********************************************************
 * AI HANDLER
 **********************************************************/
let handleAI = () => {
  for (let enemy of enemies) {
    // make occasional noise
    enemy.makeNoise();

    let vec = pacman.position.clone().sub(enemy.position).setY(0).normalize();
    let testPosition = enemy.position.clone()
      .add(vec.clone().multiplyScalar(enemy.speed))
    if (testPosition.distanceTo(pacman.position) > enemy.killDist) {
      enemy.position.add(vec.clone().multiplyScalar(enemy.speed));
      
      // make sure enemy faces Pacman
      let angle = new THREE.Vector3(0, 0, 1).angleTo(vec);
      if (pacman.position.x - enemy.position.x < 0) {
        angle = Math.PI*2 - angle;
      }
      enemy.rotation.y = angle;
    } else {
      // defeat
      globalMusic.stop();
      let sound = new THREE.Audio(listener);
      audioLoader.load('./src/music/defeat.mp3', (buffer) => {
        sound.setBuffer(buffer);
        sound.setVolume(0.25);
        sound.play();
      });
      gameOver = true;
    }
  }
}

/**********************************************************
 * PICKUPS HANDLER
 **********************************************************/
let handlePickups = () => {
  // Spawn fruit
  if (clock.getElapsedTime() - lastFruitSpawnTime > betweenfruitSpawnTime) {
    lastFruitSpawnTime = clock.getElapsedTime()

    // Choose random fruit to spawn
    let fruitIndex = parseInt(Math.random() * consts.FRUIT.length)
    let fruit = consts.FRUIT[fruitIndex], 
        scale = consts.FRUIT_SCALE[fruit]

    // Create ammo Pickup object
    let pickup = new Pickup(fruit, 'ammo')
    pickup.scale.multiplyScalar(scale);
    let spawnPos = new THREE.Vector3(
      Math.random() * arenaSize - arenaSize / 2, 
      -20, 
      Math.random() * arenaSize - arenaSize / 2
    )
    pickup.position.add(spawnPos);

    scene.add(pickup)
    pickups.add(pickup)
  }

  // Spawn powerup
  if (clock.getElapsedTime() - lastPowerupSpawnTime > betweenPowerupSpawnTime) {
    lastPowerupSpawnTime = clock.getElapsedTime()

    // Choose random powerup to spawn
    let powerupIndex = parseInt(Math.random() * consts.POWERUP.length)
    let powerup = consts.POWERUP[powerupIndex], 
        scale = consts.POWERUP_SCALE[powerup]

    // Create powerup Pickup object
    let pickup = new Pickup(powerup, 'powerup')
    pickup.scale.multiplyScalar(scale);
    let spawnPos = new THREE.Vector3(
      Math.random() * arenaSize - arenaSize / 2, 
      -20, 
      Math.random() * arenaSize - arenaSize / 2
    )
    pickup.position.add(spawnPos);

    scene.add(pickup)
    pickups.add(pickup)
  }

  for (let pickup of pickups) {
    let hitDist = pickup.position.clone().setY(0).
      distanceTo(pacman.position.clone().setY(0))
    if (hitDist < 25) {
      scene.remove(pickup)
      pickups.delete(pickup)
      
      let sound = new THREE.Audio(listener);
      audioLoader.load('./src/music/pop.mp3', (buffer) => {
        sound.setBuffer(buffer);
        sound.setVolume(0.20);
        sound.play();
      });

      // ammo effect
      if (pickup.type == 'ammo') {
        pacman.ammo[pickup.name] += consts.AMMO_INC
      }

      // powerup effect
      if (pickup.type == 'powerup') {
        switch (pickup.name) {
          case 'freeze': {
            freeze = true
            freezeStart = clock.getElapsedTime()
            break
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
  if (!gameOver) {
    window.requestAnimationFrame(onAnimationFrameHandler);
    handleMovement();
    handleShooting();
    handleRound();
    handleAI();
    handlePickups();
    scene.update && scene.update(timeStamp);
    renderer.render(scene, camera);
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
