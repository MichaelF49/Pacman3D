import React, { useState } from 'react';

import globals from '../global/globals';

const RightHud = ({ score, wave, enemies }) => {
  const [scoreState, setScore] = useState(score);
  const [waveState, setWave] = useState(wave);
  const [enemiesState, setEnemies] = useState(enemies);

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
