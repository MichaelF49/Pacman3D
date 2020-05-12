import {
  AmbientLight,
  Audio,
  AudioListener,
  AudioLoader,
  BackSide,
  BoxGeometry,
  Clock,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

import { GlobalMusicMP3 } from '../audio';
import { consts, globals } from '../global';
import { Sky1JPG, Sky2JPG, SkyTopJPG, SkyBotJPG } from '../images';
import { Doorwall, Hallway, Pacman, Room } from '../objects';

const initialize = () => {
  // start game clock
  globals.clock = new Clock();
  // intialize model loader
  globals.loader = new GLTFLoader();
  // initialize enemy and pickup sets
  globals.enemies = new Set();
  globals.pickups = new Set();

  /** ********************************************************
   * SCENE + CAMERA
   ********************************************************* */
  globals.camera = new PerspectiveCamera(
    75,
    // eslint-disable-next-line no-undef
    window.innerWidth / window.innerHeight,
    1,
    50000
  );
  globals.camera.position.set(0, 25, 70);
  globals.camera.lookAt(0, 0, 0);
  globals.scene = new Scene();

  /** ********************************************************
   * AUDIO
   ********************************************************* */
  globals.listener = new AudioListener();
  globals.camera.add(globals.listener);
  globals.audioLoader = new AudioLoader();

  /** ********************************************************
   * GLOBAL MUSIC
   ********************************************************* */
  globals.globalMusic = new Audio(globals.listener);
  globals.audioLoader.load(GlobalMusicMP3, (buffer) => {
    globals.globalMusic.setBuffer(buffer);
    globals.globalMusic.setLoop(true);
    globals.globalMusic.setVolume(0.05); // was 0.15
    globals.globalMusic.play();
  });

  /** ********************************************************
   * SKYBOX
   ********************************************************* */
  /*
  const loader = new TextureLoader();
  const sky1 = loader.load(Sky1JPG);
  const sky2 = loader.load(Sky2JPG);
  const skyTop = loader.load(SkyTopJPG);
  const skyBot = loader.load(SkyBotJPG);
  const skyMaterial = [
    new MeshBasicMaterial({ map: sky1, side: BackSide }),
    new MeshBasicMaterial({ map: sky1, side: BackSide }),
    new MeshBasicMaterial({ map: skyTop, side: BackSide }),
    new MeshBasicMaterial({ map: skyBot, side: BackSide }),
    new MeshBasicMaterial({ map: sky2, side: BackSide }),
    new MeshBasicMaterial({ map: sky2, side: BackSide }),
  ];
  const skyboxGeo = new BoxGeometry(15000, 20000, 15000);
  const skybox = new Mesh(skyboxGeo, skyMaterial);
  skybox.position.set(0, -2000, 0);
  globals.scene.add(skybox);
  */

  /** ********************************************************
   * PACMAN
   ********************************************************* */
  globals.pacman = new Pacman();
  globals.pacman.position.y = -18;
  globals.pacman.scale.multiplyScalar(10);
  globals.scene.add(globals.pacman);
  /** ********************************************************
   *  ROOMS (FLOORS & WALLS)
   *********************************************************** */
  globals.rooms = [];
  globals.hallways = [];

  // parameters for which walls a room has
  const sides = {
    right: false,
    left: false,
    up: false,
    down: false,
  };

  // the main room
  globals.rooms.push(
    new Room('main', consts.ARENA_SIZE, 0, 0, sides, 0x000000)
  );

  // rooms that branch off, each missing a wall
  sides.right = true;
  sides.left = true;
  sides.up = true;
  globals.rooms.push(
    new Room(
      'room1',
      consts.BRANCH_SIZE,
      consts.ARENA_SIZE / 2 + consts.BRANCH_SIZE / 2 + consts.HALLWAY_LENGTH,
      0,
      sides,
      consts.PINK
    )
  );
  globals.hallways.push(
    new Hallway(
      'hallway1',
      consts.HALLWAY_LENGTH,
      consts.ARENA_SIZE / 2 + consts.HALLWAY_LENGTH / 2,
      0,
      sides,
      consts.PINK
    )
  );

  sides.left = false;
  sides.down = true;
  globals.rooms.push(
    new Room(
      'room2',
      consts.BRANCH_SIZE,
      0,
      consts.ARENA_SIZE / 2 + consts.BRANCH_SIZE / 2 + consts.HALLWAY_LENGTH,
      sides,
      consts.RED
    )
  );
  globals.hallways.push(
    new Hallway(
      'hallway2',
      consts.HALLWAY_LENGTH,
      0,
      consts.ARENA_SIZE / 2 + consts.HALLWAY_LENGTH / 2,
      sides,
      consts.RED
    )
  );

  sides.up = false;
  sides.left = true;
  globals.rooms.push(
    new Room(
      'room3',
      consts.BRANCH_SIZE,
      -(consts.ARENA_SIZE / 2 + consts.BRANCH_SIZE / 2 + consts.HALLWAY_LENGTH),
      0,
      sides,
      consts.BLUE
    )
  );
  globals.hallways.push(
    new Hallway(
      'hallway3',
      consts.HALLWAY_LENGTH,
      -(consts.ARENA_SIZE / 2 + consts.HALLWAY_LENGTH / 2),
      0,
      sides,
      consts.BLUE
    )
  );

  sides.right = false;
  sides.up = true;
  globals.rooms.push(
    new Room(
      'room4',
      consts.BRANCH_SIZE,
      0,
      -(consts.ARENA_SIZE / 2 + consts.BRANCH_SIZE / 2 + consts.HALLWAY_LENGTH),
      sides,
      consts.YELLOW
    )
  );
  globals.hallways.push(
    new Hallway(
      'hallway4',
      consts.HALLWAY_LENGTH,
      0,
      -(consts.ARENA_SIZE / 2 + consts.HALLWAY_LENGTH / 2),
      sides,
      consts.YELLOW
    )
  );

  /** ********************************************************
   * DOORWAY WALLS
   ********************************************************* */
  new Doorwall('doors', consts.ARENA_SIZE, consts.BRANCH_SIZE, 0, 0);

  /** ********************************************************
   * LIGHTS
   ********************************************************* */
  let light = new PointLight(0xffffff, 0.2, 10000);
  light.position.set(-consts.ARENA_SIZE / 2, 1000, consts.ARENA_SIZE / 2);
  globals.scene.add(light);

  light = new PointLight(0xffffff, 0.2, 10000);
  light.position.set(consts.ARENA_SIZE / 2, 1000, consts.ARENA_SIZE / 2);
  globals.scene.add(light);

  light = new PointLight(0xffffff, 0.2, 10000);
  light.position.set(consts.ARENA_SIZE, 1000, -consts.ARENA_SIZE / 2);
  globals.scene.add(light);

  light = new PointLight(0xffffff, 0.2, 10000);
  light.position.set(-consts.ARENA_SIZE / 2, 1000, -consts.ARENA_SIZE / 2);
  globals.scene.add(light);

  light = new AmbientLight(0xffffff); // soft white light
  globals.scene.add(light);

  /** ********************************************************
   * RENDERER
   ********************************************************* */
  globals.renderer = new WebGLRenderer({ antialias: true });
  // eslint-disable-next-line no-undef
  globals.renderer.setPixelRatio(window.devicePixelRatio);
  // eslint-disable-next-line no-undef
  globals.renderer.setSize(window.innerWidth, window.innerHeight);

  // composer
  globals.composer = new EffectComposer(globals.renderer);
  globals.composer.addPass(new RenderPass(globals.scene, globals.camera));

  // if we wanted to implement another sort of thing like bloom

  // var bloomPass = new UnrealBloomPass(
  //   new Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
  // bloomPass.threshold = 0.5;
  // bloomPass.strength = 0.6;
  // bloomPass.radius = 0;
  // composer.addPass( bloomPass );
  /** ********************************************************
   * CANVAS
   ********************************************************* */
  const canvas = globals.renderer.domElement;
  canvas.style.display = 'block'; // Removes padding below canvas

  /** ********************************************************
   * CSS adjustments
   ********************************************************* */
  // eslint-disable-next-line no-undef
  document.body.style.margin = 0; // Removes margin around page
  // eslint-disable-next-line no-undef
  document.body.style.overflow = 'hidden'; // Fix scrolling
  // eslint-disable-next-line no-undef
  document.body.appendChild(canvas);
};

export default initialize;
