import React, { useState } from 'react';

import { globals } from '../global';
import { FreezeJPG, HeartPNG, StarJPG } from '../images';

const BottomHud = () => {
  const [numHearts, setNumHearts] = useState(globals.pacman.health);
  const [freeze, setFreeze] = useState(globals.freeze);
  const [star, setStar] = useState(globals.star);

  globals.updateHeartsAndPowerup = () => {
    setNumHearts(globals.pacman.health);
    setFreeze(globals.freeze);
    setStar(globals.star);
  };

  const heartElem = [];
  for (let i = 0; i < numHearts; i += 1) {
    heartElem.push(
      <img
        key={i}
        className='heart-img'
        src={HeartPNG}
        alt='HP'
        style={{ width: 60, height: 60 }}
      />
    );
  }

  const starIcon = star ? (
    <img src={StarJPG} alt='cherry' style={{ width: 60, height: 60 }} />
  ) : null;
  const freezeIcon = freeze ? (
    <img src={FreezeJPG} alt='cherry' style={{ width: 60, height: 60 }} />
  ) : null;

  return (
    <div className='bottom-hud'>
      {freezeIcon}
      {'    '}
      {starIcon}
      <div className='hp'>
        <p>{heartElem}</p>
      </div>
    </div>
  );
};

export default BottomHud;
