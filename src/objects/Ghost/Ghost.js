import {Audio, AudioLoader, Group} from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

class Ghost extends Group {
  constructor(listener, clock) {
    // Call parent Group() constructor
    super();

    this.listener = listener;
    this.clock = clock;

    this.health = 5;
    this.speed = 1.2;
    this.hoverHeight = Math.random() * 1.5 + 1.5;
    // KILL DIST PARAMETERS:
    // 35 for mario ghosts
    // 25 for pac-man ghosts
    this.killDist = 25;
    this.noiseTimeDiff = 12 - 8 * Math.random();
    this.oldTime = this.clock.getElapsedTime();
    this.name = 'ghost';
    this.audioLoader = new AudioLoader();
    this.meshes = [];
    this.body = [];

    const loader = new GLTFLoader();
    loader.load('./src/models/blue_ghost6.glb', (gltf) => {
      // this.meshes = gltf.scene.children[0].children[0].children;
      // accessing the meshes of the "group"
      this.meshes.push(gltf.scene.children[0].children[0]);
      let objects = gltf.scene.children[1].children[0].children[0].children[0].children;
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
      for (let mesh of this.body) {
        mesh.material.color.r = 1;
        mesh.material.color.g = 0;
        mesh.material.color.b = 0;
        mesh.material.emissive.r = 0.5;
        mesh.material.emissive.g = 0;
        mesh.material.emissive.b = 0;
      }

      this.meshes.push(gltf.scene.children[1].children[0].children[0].children[0].children[0]);
      // setting the ghosts to be initially transparent
      for (let msh of this.meshes) {
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
    if (this.clock.getElapsedTime() - this.oldTime > this.noiseTimeDiff) {
      let file = (Math.random() > 0.5) ?
        './src/music/ghost_noise1.mp3' : './src/music/ghost_noise2.mp3';

      let sound = new Audio(this.listener);
      this.audioLoader.load(file, (buffer) => {
        sound.setBuffer(buffer);
        sound.setVolume(0.3);
        sound.play();
      });

      this.oldTime = this.clock.getElapsedTime();
      this.noiseTimeDiff = 12 - 8*Math.random();
    }
  }

  death() {
    let sound = new Audio(this.listener);
    this.audioLoader.load('./src/music/ghost_death.mp3', (buffer) => {
      sound.setBuffer(buffer);
      sound.setVolume(0.3);
      sound.play();
    });
  }
}

export default Ghost;