import React, { useState } from 'react';

import { globals } from '../global';

const TopHud = () => {
  const [numOrange, setNumOrange] = useState(globals.pacman.ammo.orange);
  const [numMelon, setNumMelon] = useState(globals.pacman.ammo.melon);

  globals.updateAmmo = () => {
    setNumOrange(globals.pacman.ammo.orange);
    setNumMelon(globals.pacman.ammo.melon);
  };

  return (
    <p className='top-hud'>
      Cherries: ∞, Oranges: {numOrange}, Melons: {numMelon}
    </p>
  );
};

export default TopHud;
