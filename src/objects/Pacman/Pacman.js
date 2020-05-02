import {Group} from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

class Pacman extends Group {
  constructor() {
    // Call parent Group() constructor
    super();

    const loader = new GLTFLoader();
    this.name = 'land';
    loader.load('./src/objects/Pacman/pacman.glb', (gltf) => {
      this.add(gltf.scene);
    });
  }
}

export default Pacman;