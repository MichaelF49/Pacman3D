import {Group} from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

class Cherry extends Group {
  constructor(direction) {
    // Call parent Group() constructor
    super();

    this.name = 'cherry';
    this.speed = 0.3;
    this.direction = direction;

    const loader = new GLTFLoader();
    loader.load('./src/objects/Cherry/cherry.glb', (gltf) => {
      this.add(gltf.scene);
    });
  }
}

export default Cherry;