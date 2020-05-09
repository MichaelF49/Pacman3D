import { Group } from 'three';

import globals from '../../globals';

import CherryGLB from '../../models/cherry.glb';
import FreezeGLB from '../../models/freeze.glb';
import MelonGLB from '../../models/melon.glb';
import OrangeGLB from '../../models/orange.glb';
import StarGLB from '../../models/star.glb';

class Pickup extends Group {
  constructor(name, type) {
    // Call parent Group() constructor
    super();

    this.name = name;
    this.type = type;

    let model = null;
    switch (type) {
      case 'ammo': {
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
        break;
      }
      case 'powerup': {
        switch (name) {
          case 'freeze': {
            model = FreezeGLB;
            break;
          }
          case 'star': {
            model = StarGLB;
            break;
          }
          default: {
            // error
          }
        }
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

export default Pickup;
