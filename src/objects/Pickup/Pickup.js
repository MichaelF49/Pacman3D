import { Group } from 'three';

import { globals } from '../../global';
import {
  CherryGLB,
  FreezeGLB,
  HeartGLB,
  MelonGLB,
  OrangeGLB,
  StarGLB,
} from '../../models';

class Pickup extends Group {
  constructor(name, type) {
    // Call parent Group() constructor
    super();

    this.name = name;
    this.type = type;
    this.hoverHeight = Math.random() * 0.05 + 0.1;
    this.seed = Math.random();

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
          case 'heart': {
            model = HeartGLB;
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
