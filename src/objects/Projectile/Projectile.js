import { Group } from 'three';

import consts from '../../consts';
import globals from '../../globals';

import CherryGLB from '../../models/cherry.glb';
import MelonGLB from '../../models/melon.glb';
import OrangeGLB from '../../models/orange.glb';

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
