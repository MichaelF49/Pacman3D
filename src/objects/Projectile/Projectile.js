import { Group } from 'three';

import consts from '../../consts';
import globals from '../../globals';

import CHERRY_glb from '../../models/cherry.glb';
import MELON_glb from '../../models/melon.glb';
import ORAGNGE_glb from '../../models/orange.glb';

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
        model = CHERRY_glb;
        break;
      }
      case 'orange': {
        model = ORAGNGE_glb;
        break;
      }
      case 'melon': {
        model = MELON_glb;
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
