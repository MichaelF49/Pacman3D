import globals from '../globals';

const handleKeys = () => {
  const onKeyDown = (event) => {
    switch (event.keyCode) {
      case 87: {
        // w
        globals.moveForward = true;
        break;
      }
      case 65: {
        // a
        globals.moveLeft = true;
        break;
      }
      case 83: {
        // s
        globals.moveBackward = true;
        break;
      }
      case 68: {
        // d
        globals.moveRight = true;
        break;
      }
      case 32: {
        // space
        if (!globals.spaceDown && !globals.gameOver) {
          globals.pacman.shoot();
          globals.spaceDown = true;
        }
        break;
      }
      case 49: {
        // 1
        globals.pacman.switchFruit(1);
        break;
      }
      case 50: {
        // 2
        globals.pacman.switchFruit(2);
        break;
      }
      case 51: {
        // 2
        globals.pacman.switchFruit(3);
        break;
      }
      default: {
        // error
      }
    }
  };

  const onKeyUp = (event) => {
    switch (event.keyCode) {
      case 87: {
        // w
        globals.moveForward = false;
        break;
      }
      case 65: {
        // a
        globals.moveLeft = false;
        break;
      }
      case 83: {
        // s
        globals.moveBackward = false;
        break;
      }
      case 68: {
        // d
        globals.moveRight = false;
        break;
      }
      case 32: {
        // space
        globals.spaceDown = false;
        break;
      }
      default: {
        // error
      }
    }
  };

  // add key handlers
  window.addEventListener('keydown', onKeyDown, false);
  window.addEventListener('keyup', onKeyUp, false);
};

export default handleKeys;
