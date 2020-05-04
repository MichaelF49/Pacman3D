import {Group} from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

class Pickup extends Group {
  constructor(name) {
    // Call parent Group() constructor
    super();

    this.name = name;

    const loader = new GLTFLoader();
    loader.load(`./src/models/${this.name}.glb`, (gltf) => {
      this.add(gltf.scene);
    });
  }
}

export default Pickup;