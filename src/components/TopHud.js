import React, { useState } from 'react';

import { CherryJPG, MelonJPG, OrangeJPG } from '../images';
import { globals } from '../global';

const TopHud = () => {
  const [numOrange, setNumOrange] = useState(globals.pacman.ammo.orange);
  const [numMelon, setNumMelon] = useState(globals.pacman.ammo.melon);

  globals.updateAmmo = () => {
    setNumOrange(globals.pacman.ammo.orange);
    setNumMelon(globals.pacman.ammo.melon);
  };

  return (
    <div className='top-hud'>
      <div>
        <img src={CherryJPG} alt='cherry' style={{ width: 60, height: 60 }} /> ∞
      </div>
      <div>
        <img src={OrangeJPG} alt='cherry' style={{ width: 60, height: 60 }} />{' '}
        {numOrange}
      </div>
      <div>
        <img src={MelonJPG} alt='cherry' style={{ width: 60, height: 60 }} />{' '}
        {numMelon}
      </div>
    </div>
  );
};

export default TopHud;
