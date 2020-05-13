import React, { useState } from 'react';
import firebase from 'firebase';

import {
  BottomHud,
  Defeat,
  Leaderboard,
  Menu,
  PauseMenu,
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
  // if title menu is showing
  const [showingMenu, setShowingMenu] = useState(true);
  const [showingVictory, setShowingVictory] = useState(false);
  const [showingDefeat, setShowingDefeat] = useState(false);
  const [showingLeaderboard, setShowingLeaderboard] = useState(false);

  const [paused, setPaused] = useState(false);
  globals.updatePaused = () => {
    setPaused(globals.paused);
  };

  if (!globals.db) {
    const config = {
      apiKey: 'AIzaSyC7IA_1E8Zs0xBuaiplY1kUiA3Gd-8X-6k',
      authDomain: 'pac-atac.firebaseapp.com',
      databaseURL: 'https://pac-atac.firebaseio.com',
      projectId: 'pac-atac',
      storageBucket: 'pac-atac.appspot.com',
      messagingSenderId: '567926428102',
      appId: '1:567926428102:web:91c2c9500f8a148e51e2c7',
      measurementId: 'G-MLKW6LP0QH',
    };
    firebase.initializeApp(config);
    globals.db = firebase.firestore().collection('leaderboard');
  }

  /** ********************************************************
   * RENDER HANDLER
   ********************************************************* */
  const onAnimationFrameHandler = (timeStamp) => {
    if (!globals.gameOver && !globals.paused) {
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
  if (paused) {
    return <PauseMenu />;
  }

  if (!globals.gameOver) {
    // create and add key handlers
    handleKeys(true);
  }

  // show victory or defeat screens
  if (showingLeaderboard) {
    return (
      <Leaderboard
        setShowingMenu={setShowingMenu}
        setShowingLeaderboard={setShowingLeaderboard}
      />
    );
  }
  if (showingVictory) {
    return (
      <Victory
        setShowingVictory={setShowingVictory}
        setShowingLeaderboard={setShowingLeaderboard}
      />
    );
  }
  if (showingDefeat) {
    return (
      <Defeat
        setShowingDefeat={setShowingDefeat}
        setShowingLeaderboard={setShowingLeaderboard}
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
