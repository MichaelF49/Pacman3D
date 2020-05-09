import React, { useState } from 'react';
import { Clock } from 'three';

import BottomHud from './components/BottomHud';
import Menu from './components/Menu';
import RightHud from './components/RightHud';
import TopHud from './components/TopHud';

import globals from './global/globals';

import {
  handleAI,
  handleKeys,
  handleMovement,
  handlePickups,
  handleShooting,
  handleWave,
} from './handlers';

import './app.css';

const App = () => {
  // if title menus is showing
  const [showingMenu, setShowingMenu] = useState(true);

  /** ********************************************************
   * RENDER HANDLER
   ********************************************************* */
  const onAnimationFrameHandler = (timeStamp) => {
    if (!globals.gameOver) {
      window.requestAnimationFrame(onAnimationFrameHandler);

      // title menu still showing, skip handling the game
      if (!showingMenu) {
        handleMovement();
        handleShooting();
        handleWave();
        handleAI();
        handlePickups();
      }

      // eslint-disable-next-line no-unused-expressions
      globals.scene.update && globals.scene.update(timeStamp);
      globals.composer.render();
    }
  };

  // start rendering
  window.requestAnimationFrame(onAnimationFrameHandler);

  // title menu still showing, do not start game yet
  if (showingMenu) {
    return <Menu setShowingMenu={setShowingMenu} />;
  }

  // start game clock
  globals.clock = new Clock();
  // create and add key handlers
  handleKeys();

  // initialize game UI
  return (
    <div>
      <TopHud />
      <RightHud />
      <BottomHud />
    </div>
  );
};

export default App;
