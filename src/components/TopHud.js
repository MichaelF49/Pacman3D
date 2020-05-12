/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';

import {
  CherryJPG,
  CherryActiveJPG,
  MelonJPG,
  MelonActiveJPG,
  OrangeJPG,
  OrangeActiveJPG,
} from '../images';
import { globals } from '../global';

const TopHud = () => {
  const [numOrange, setNumOrange] = useState(globals.pacman.ammo.orange);
  const [numMelon, setNumMelon] = useState(globals.pacman.ammo.melon);
  const [activeFruit, setActiveFruit] = useState(globals.pacman.currentFruit);

  globals.updateAmmo = () => {
    setNumOrange(globals.pacman.ammo.orange);
    setNumMelon(globals.pacman.ammo.melon);
    setActiveFruit(globals.pacman.currentFruit);
  };

  let Cherry = CherryJPG;
  let Orange = OrangeJPG;
  let Melon = MelonJPG;
  switch (activeFruit) {
    case 'cherry': {
      Cherry = CherryActiveJPG;
      break;
    }
    case 'orange': {
      Orange = OrangeActiveJPG;
      break;
    }
    case 'melon': {
      Melon = MelonActiveJPG;
      break;
    }
    default: {
      // error
    }
  }

  return (
    <div className='top-hud'>
      <div>
        <img src={Cherry} alt='cherry' style={{ width: 60, height: 60 }} /> ∞
      </div>
      <div>
        <img src={Orange} alt='cherry' style={{ width: 60, height: 60 }} />{' '}
        {numOrange}
      </div>
      <div>
        <img src={Melon} alt='cherry' style={{ width: 60, height: 60 }} />{' '}
        {numMelon}
      </div>
    </div>
  );
};

export default TopHud;
