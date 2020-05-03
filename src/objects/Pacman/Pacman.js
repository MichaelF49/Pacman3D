import {Group, Audio} from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {Cherry} from '../Cherry';

class Pacman extends Group {
  constructor(scene, camera, listener, audioLoader) {
    // Call parent Group() constructor
    super();

    this.audioLoader = audioLoader;
    this.listener = listener;
    this.scene = scene;
    this.camera = camera;
    this.name = 'land';
    this.ammo = 15;
    this.projectiles = new Set();

    const loader = new GLTFLoader();
    loader.load('./src/objects/Pacman/pacman.glb', (gltf) => {
      this.add(gltf.scene);
    });
  }

  shoot() {
    if (this.ammo > 0) {
      // there is ammo, fire a projectile
      this.ammo--;

      let vec = this.position.clone().sub(this.camera.position);
      vec.setY(this.position.Y - 5).normalize();
      let cherry = new Cherry(vec);
      cherry.scale.multiplyScalar(3);
      cherry.position.add(this.position);

      this.scene.add(cherry);
      this.projectiles.add(cherry);

      // play cherry sound
      let sound = new Audio(this.listener);
      this.audioLoader.load('./src/music/cherry_blast.mp3', (buffer) => {
        sound.setBuffer(buffer);
        sound.setVolume(0.3);
        sound.play();
      });
    } else {
      // no ammo
      // play no ammo sound
      let sound = new Audio(this.listener);
      this.audioLoader.load('./src/music/no_ammo.mp3', (buffer) => {
        sound.setBuffer(buffer);
        sound.setVolume(0.05);
        sound.play();
      });
    }
  }
}

export default Pacman;