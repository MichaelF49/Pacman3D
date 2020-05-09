/* eslint-disable no-restricted-syntax */
import { Audio, Group } from 'three';

import { GhostDeathMP3, GhostNoise1MP3, GhostNoise2MP3 } from '../../audio';
import { consts, globals } from '../../global';
import { GhostGLB } from '../../models';

class Ghost extends Group {
  constructor() {
    // Call parent Group() constructor
    super();

    this.health =
      5 +
      ((1.0 * globals.currentWave) / (consts.WAVES.length - 1)) *
        (consts.DIFFICULTY_SCALE.MAX_HEALTH - 5);
    this.speed =
      1.2 +
      ((1.0 * globals.currentWave) / (consts.WAVES.length - 1)) *
        (consts.DIFFICULTY_SCALE.MAX_SPEED - 1.2);
    this.hoverHeight = Math.random() * 1.5 + 1.5;
    this.killDist = consts.KILL_DIST_PACMAN;
    this.noiseTimeDiff = 12 - 8 * Math.random();
    this.oldTime = globals.clock.getElapsedTime();
    this.name = 'ghost';
    this.meshes = [];
    this.body = [];

    globals.loader.load(GhostGLB, (gltf) => {
      // this.meshes = gltf.scene.children[0].children[0].children;
      // accessing the meshes of the "group"
      this.meshes.push(gltf.scene.children[0].children[0]);
      const objects =
        gltf.scene.children[1].children[0].children[0].children[0].children;
      this.meshes.push(objects[1].children[0]);
      this.meshes.push(objects[1].children[0]);
      this.meshes.push(objects[1].children[1]);
      this.meshes.push(objects[2].children[1]);
      this.meshes.push(objects[2].children[2]);
      // this.meshes.push(objects[2].children[0].children[0]);
      // this.meshes.push(objects[2].children[0].children[1]);
      // this.meshes.push(objects[2].children[0].children[2]);
      this.meshes.push(objects[3].children[0]);
      this.meshes.push(objects[3].children[0]);
      this.meshes.push(objects[4].children[2]);
      // this.meshes.push(objects[4].children[0].children[0]);
      // this.meshes.push(objects[4].children[0].children[1]);
      // this.meshes.push(objects[4].children[0].children[2]);

      this.body = this.meshes;
      for (const mesh of this.body) {
        mesh.material.color.r = 1;
        mesh.material.color.g = 0;
        mesh.material.color.b = 0;
        mesh.material.emissive.r = 0.5;
        mesh.material.emissive.g = 0;
        mesh.material.emissive.b = 0;
      }

      this.meshes.push(
        gltf.scene.children[1].children[0].children[0].children[0].children[0]
      );
      // setting the ghosts to be initially transparent
      for (const msh of this.meshes) {
        if (msh.material !== undefined) {
          msh.material.opacity = 0;
          msh.material.transparent = true;
        }
      }

      // adding the group to the scene
      this.add(gltf.scene);
    });
  }

  makeNoise() {
    if (globals.clock.getElapsedTime() - this.oldTime > this.noiseTimeDiff) {
      const file = Math.random() > 0.5 ? GhostNoise1MP3 : GhostNoise2MP3;

      const sound = new Audio(globals.listener);
      globals.audioLoader.load(file, (buffer) => {
        sound.setBuffer(buffer);
        sound.setVolume(0.3);
        sound.play();
      });

      this.oldTime = globals.clock.getElapsedTime();
      this.noiseTimeDiff = 12 - 8 * Math.random();
    }
  }

  death() {
    globals.scene.remove(this);
    globals.enemies.delete(this);

    const sound = new Audio(globals.listener);
    globals.audioLoader.load(GhostDeathMP3, (buffer) => {
      sound.setBuffer(buffer);
      sound.setVolume(0.3);
      sound.play();
    });
  }
}

export default Ghost;
