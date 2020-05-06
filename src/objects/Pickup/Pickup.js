import {Group} from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

class Pickup extends Group {
  constructor(name, type) {
    // Call parent Group() constructor
    super();

    this.name = name;
    this.type = type;

    const loader = new GLTFLoader();
    loader.load(`./src/models/${this.name}.glb`, (gltf) => {
      this.add(gltf.scene);
    });
  }
}

export default Pickup;