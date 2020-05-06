import {Group} from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

class Projectile extends Group {
  constructor(direction, name) {
    // Call parent Group() constructor
    super();

    this.name = name;
    this.speed = 0.3;
    this.direction = direction;
    this.damage = 0;

    switch (name) {
      case 'cherry': {
        this.damage = 1;
        break;
      }
      case 'orange': {
        this.damage = 2.5;
        break;
      }
      case 'melon': {
        this.damage = 5;
        break;
      }
    }

    const loader = new GLTFLoader();
    loader.load(`./src/models/${this.name}.glb`, (gltf) => {
      this.add(gltf.scene);
    });
  }
}

export default Projectile;