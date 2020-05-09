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
    <p className='right-hud'>
      Score: {scoreState}, Wave: {waveState}, Enemies: {enemiesState}
    </p>
  );
};

export default RightHud;
