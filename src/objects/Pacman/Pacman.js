import {Group, Audio, AudioLoader} from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {Projectile} from '../Projectile';

class Pacman extends Group {
  constructor(scene, camera, listener) {
    // Call parent Group() constructor
    super();

    this.scene = scene;
    this.camera = camera;
    this.listener = listener;

    this.audioLoader = new AudioLoader();
    this.name = 'land';
    this.ammo = 100;
    this.projectiles = new Set();
    this.currentFruit = 'cherry'  // should make const file and get from there

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

      let proj = new Projectile(vec, this.currentFruit);
      proj.scale.multiplyScalar(3);
      proj.position.add(this.position);

      this.scene.add(proj);
      this.projectiles.add(proj);

      // play proj sound
      let sound = new Audio(this.listener);
      this.audioLoader.load('./src/music/cherry_blast.mp3', (buffer) => {
        sound.setBuffer(buffer);
        sound.setVolume(0.3);
        sound.play();
      });
    } else {
      // no ammo, play empty ammo sound
      let sound = new Audio(this.listener);
      this.audioLoader.load('./src/music/no_ammo.mp3', (buffer) => {
        sound.setBuffer(buffer);
        sound.setVolume(0.2);
        sound.play();
      });
    }
  }
}

export default Pacman;