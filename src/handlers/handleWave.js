import { Audio, Vector3, Color } from 'three';

import { handleKeys } from '.';
import { VictoryMP3, WaveStartMP3 } from '../audio';
import { consts, globals } from '../global';
import { Ghost } from '../objects';

const handleWave = () => {
  if (
    globals.enemies.size === 0 &&
    (globals.survival || globals.currentWave < consts.WAVES.length)
  ) {
    // new wave should start, begin countdown
    if (!globals.startedWave) {
      globals.startedWave = true;
      globals.startWaveTime = globals.clock.getElapsedTime();
      return;
    }

    // wait for countdown to finish
    if (
      globals.clock.getElapsedTime() - globals.startWaveTime <
      consts.WAVE_RESET_TIME
    ) {
      return;
    }
    // reset flag back
    globals.startedWave = false;

    // start new wave
    const sound = new Audio(globals.listener);
    globals.audioLoader.load(WaveStartMP3, (buffer) => {
      sound.setBuffer(buffer);
      sound.setVolume(0.1);
      sound.play();
    });

    const colors = [
      consts.WHITE,
      consts.PINK,
      consts.RED,
      consts.BLUE,
      consts.YELLOW,
    ];

    // spawn globals.enemies
    const numEnemies = globals.survival
      ? globals.currentWave * 3 + 3
      : consts.WAVES[globals.currentWave];
    for (let i = 0; i < numEnemies; i += 1) {
      const roomIndex = Math.floor(Math.random() * globals.rooms.length);
      const room = globals.rooms[roomIndex];
      const ghost = new Ghost(new Color(colors[roomIndex]));
      ghost.scale.multiplyScalar(0.2);
      ghost.position.y -= 20;

      // spawn randomly around edges of arena such that ghosts are certain radius
      // away from pacman
      let randVec;
      do {
        // picking a room
        randVec = new Vector3(
          Math.random() * (room.maxX - room.minX - 2 * consts.GHOST_RADIUS) +
            room.minX +
            consts.GHOST_RADIUS,
          0,
          Math.random() * (room.maxZ - room.minZ - 2 * consts.GHOST_RADIUS) +
            room.minZ +
            consts.GHOST_RADIUS
        );
      } while (
        randVec
          .clone()
          .add(ghost.position)
          .sub(globals.pacman.position)
          .length() < consts.SAFE_RADIUS
      );
      ghost.position.add(randVec);

      // make sure enemy faces Pacman
      const vec = globals.pacman.position
        .clone()
        .sub(ghost.position)
        .setY(0)
        .normalize();
      let angle = new Vector3(0, 0, 1).angleTo(vec);
      if (globals.pacman.position.x - ghost.position.x < 0) {
        angle = Math.PI * 2 - angle;
      }
      ghost.rotation.y = angle;

      globals.enemies.add(ghost);
      globals.scene.add(ghost);
    }

    // remove hallway entrances as rounds continue
    if (globals.currentWave >= 1 && globals.currentWave <= 4) {
      globals.scene.remove(
        globals.hallways[globals.currentWave - 1].entrances[0]
      );
      globals.scene.remove(
        globals.hallways[globals.currentWave - 1].entrances[1]
      );
    }

    globals.currentWave += 1;
    globals.updateGameProps();
  } else if (
    globals.enemies.size === 0 &&
    !globals.survival &&
    globals.currentWave === consts.WAVES.length
  ) {
    // victory
    globals.globalMusic.stop();
    if (globals.starMusic !== null) {
      globals.starMusic.stop();
    }
    const sound = new Audio(globals.listener);
    globals.audioLoader.load(VictoryMP3, (buffer) => {
      sound.setBuffer(buffer);
      sound.setVolume(0.25);
      sound.play();
    });

    globals.victory = true;
    globals.gameOverTime = globals.clock.getElapsedTime();

    // remove key handlers
    handleKeys(false);
  }
};

export default handleWave;
