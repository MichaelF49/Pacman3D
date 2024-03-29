import { globals } from '../global';

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
      if (!globals.spaceDown) {
        globals.pacman.shoot();
        globals.updateAmmo();
        globals.spaceDown = true;
      }
      break;
    }
    case 74: {
      // J
      globals.pacman.switchFruit(1);
      globals.updateAmmo();
      break;
    }
    case 75: {
      // K
      globals.pacman.switchFruit(2);
      globals.updateAmmo();
      break;
    }
    case 76: {
      // L
      globals.pacman.switchFruit(3);
      globals.updateAmmo();
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

const handleKeys = (addListener) => {
  if (addListener) {
    // add key handlers
    window.addEventListener('keydown', onKeyDown, false);
    window.addEventListener('keyup', onKeyUp, false);
  } else {
    // add key handlers
    window.removeEventListener('keydown', onKeyDown, false);
    window.removeEventListener('keyup', onKeyUp, false);
  }
};

export default handleKeys;
