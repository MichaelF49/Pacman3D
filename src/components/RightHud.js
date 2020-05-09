import React, { useState } from 'react';

import { globals } from '../global';

const RightHud = () => {
  const [scoreState, setScore] = useState(globals.score);
  const [waveState, setWave] = useState(globals.currentWave);
  const [enemiesState, setEnemies] = useState(globals.enemies.size);

  globals.updateGameProps = () => {
    setScore(globals.score);
    setWave(globals.currentWave);
    setEnemies(globals.enemies.size);
  };

  return (
    <div className='right-hud'>
      <div>SCORE: {scoreState}</div>
      <div>WAVE: {waveState}</div>
      <div>ENEMIES: {enemiesState}</div>
    </div>
  );
};

export default RightHud;
