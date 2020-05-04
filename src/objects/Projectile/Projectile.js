import {Group} from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

class Projectile extends Group {
  constructor(direction, name) {
    // Call parent Group() constructor
    super();

    this.name = name;
    this.speed = 0.3;
    this.direction = direction;

    const loader = new GLTFLoader();
    loader.load(`./src/objects/Projectile/${this.name}.glb`, (gltf) => {
      this.add(gltf.scene);
    });
  }
}

export default Projectile;