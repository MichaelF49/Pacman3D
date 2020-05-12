import { Audio, Group } from 'three';

import { Projectile } from '.';
import { NoAmmoMP3, ProjectileFiredMP3, SwitchMP3 } from '../audio';
import { consts, globals } from '../global';
import { PacmanGLB } from '../models';

class Pacman extends Group {
  constructor() {
    // Call parent Group() constructor
    super();

    this.health = consts.PACMAN_HEALTH;
    this.name = 'pacman';
    this.ammo = {};
    for (let i = 0; i < consts.FRUIT.length; i += 1) {
      this.ammo[consts.FRUIT[i]] = 0;
    }
    this.ammo[consts.DEFAULT_FRUIT] = 1;

    this.projectiles = new Set();
    this.currentFruit = consts.DEFAULT_FRUIT;

    globals.loader.load(PacmanGLB, (gltf) => {
      this.add(gltf.scene);
    });
  }

  shoot() {
    if (this.ammo[this.currentFruit] > 0) {
      // there is ammo, fire a projectile
      if (this.currentFruit !== consts.DEFAULT_FRUIT) {
        // only subtract if special ammo
        this.ammo[this.currentFruit] -= 1;
      }

      const vec = this.position.clone().sub(globals.camera.position);
      vec.setY(this.position.Y - 5).normalize();

      const proj = new Projectile(vec, this.currentFruit);
      proj.scale.multiplyScalar(consts.FRUIT_SCALE[this.currentFruit]);
      proj.position.add(this.position);

      globals.scene.add(proj);
      this.projectiles.add(proj);

      // play proj sound
      let rate = 1;
      if (this.currentFruit === 'orange') {
        rate = 0.8;
      }
      if (this.currentFruit === 'melon') {
        rate = 0.6;
      }
      const sound = new Audio(globals.listener);
      globals.audioLoader.load(ProjectileFiredMP3, (buffer) => {
        sound.setBuffer(buffer);
        sound.setVolume(0.3);
        sound.setPlaybackRate(rate);
        sound.play();
      });
    } else {
      // no ammo, play empty ammo sound
      const sound = new Audio(globals.listener);
      globals.audioLoader.load(NoAmmoMP3, (buffer) => {
        sound.setBuffer(buffer);
        sound.setVolume(0.2);
        sound.play();
      });
    }
  }

  switchFruit(index) {
    const sound = new Audio(globals.listener);
    globals.audioLoader.load(SwitchMP3, (buffer) => {
      sound.setBuffer(buffer);
      sound.setVolume(0.2);
      sound.play();
    });
    this.currentFruit = consts.FRUIT[index - 1];
  }
}

export default Pacman;
