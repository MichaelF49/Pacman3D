import React, { useState } from 'react';

import {
  BottomHud,
  Defeat,
  Menu,
  RightHud,
  TopHud,
  Victory,
} from './components';
import { globals } from './global';
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
  const [showingVictory, setShowingVictory] = useState(false);
  const [showingDefeat, setShowingDefeat] = useState(false);

  /** ********************************************************
   * RENDER HANDLER
   ********************************************************* */
  const onAnimationFrameHandler = (timeStamp) => {
    if (!globals.gameOver) {
      window.requestAnimationFrame(onAnimationFrameHandler);

      if (globals.gameOverTime === -1) {
        // title menu still showing, skip handling the game
        if (!showingMenu) {
          handleMovement();
          handleShooting();
          handleWave();
          handleAI();
          handlePickups();
        }
      } else if (globals.clock.getElapsedTime() > globals.gameOverTime + 3) {
        // game over initiated, wait 3 s for ending music to play
        globals.gameOver = true;

        // initiate ending UI
        setShowingVictory(globals.victory);
        setShowingDefeat(globals.defeat);
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

  if (!globals.gameOver) {
    // create and add key handlers
    handleKeys(true);
  }

  // show victory or defeat screens
  if (showingVictory) {
    return (
      <Victory
        setShowingVictory={setShowingVictory}
        setShowingDefeat={setShowingDefeat}
        setShowingMenu={setShowingMenu}
      />
    );
  }
  if (showingDefeat) {
    return (
      <Defeat
        setShowingVictory={setShowingVictory}
        setShowingDefeat={setShowingDefeat}
        setShowingMenu={setShowingMenu}
      />
    );
  }

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
