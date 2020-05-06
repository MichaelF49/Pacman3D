import {Group} from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

import consts from '../../consts';

class Projectile extends Group {
  constructor(direction, name) {
    // Call parent Group() constructor
    super();

    this.name = name;
    this.speed = consts.FRUIT_SPEED[name];
    this.direction = direction;
    this.damage = consts.FRUIT_DAMAGE[name];

    const loader = new GLTFLoader();
    loader.load(`./src/models/${this.name}.glb`, (gltf) => {
      this.add(gltf.scene);
    });
  }
}

export default Projectile;