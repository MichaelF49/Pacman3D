import { Group } from 'three';

import { consts, globals } from '../global';
import { CherryGLB, MelonGLB, OrangeGLB } from '../models';

class Projectile extends Group {
  constructor(direction, name) {
    // Call parent Group() constructor
    super();

    this.name = name;
    this.speed = consts.FRUIT_SPEED[name];
    this.direction = direction;
    this.damage = consts.FRUIT_DAMAGE[name];

    let model = null;
    switch (name) {
      case 'cherry': {
        model = CherryGLB;
        break;
      }
      case 'orange': {
        model = OrangeGLB;
        break;
      }
      case 'melon': {
        model = MelonGLB;
        break;
      }
      default: {
        // error
      }
    }

    globals.loader.load(model, (gltf) => {
      this.add(gltf.scene);
    });
  }
}

export default Projectile;
