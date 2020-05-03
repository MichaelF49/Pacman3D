import {Group} from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

class Ghost extends Group {
  constructor() {
    // Call parent Group() constructor
    super();

    this.name = 'ghost';

    const loader = new GLTFLoader();
    loader.load('./src/objects/Ghost/ghost.glb', (gltf) => {
      this.add(gltf.scene);
    });
  }
}

export default Ghost;