import {Group, PositionalAudio} from 'three';
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
    this.ammo = 10;
    this.projectiles = new Set();

    const loader = new GLTFLoader();
    loader.load('./src/objects/Pacman/pacman.glb', (gltf) => {
      this.add(gltf.scene);
    });
  }

  shoot() {
    if (this.ammo > 0) {
      this.ammo--;
      console.log("fired bullet!", this.ammo);

      let vec = this.position.clone().sub(this.camera.position);
      vec.setY(this.position.Y - 5).normalize();
      let cherry = new Cherry(vec);
      cherry.scale.multiplyScalar(3);
      cherry.position.add(this.position);

      this.scene.add(cherry);
      this.projectiles.add(cherry);

      let sound = new PositionalAudio(this.listener);
      this.audioLoader.load('./src/music/cherry_blast.mp3', (buffer) => {
        sound.setBuffer(buffer);
        sound.setRefDistance(200);
        sound.setVolume(0.3);
        sound.play();
      });
      this.add(sound);
    } else {
      let sound = new PositionalAudio(this.listener);
      this.audioLoader.load('./src/music/no_ammo.mp3', (buffer) => {
        sound.setBuffer(buffer);
        sound.setRefDistance(200);
        sound.setVolume(0.1);
        sound.play();
      });
      this.add(sound);
    }
  }
}

export default Pacman;