import React, { useState } from 'react';

import globals from '../global/globals';

const TopHud = ({ orange, melon }) => {
  const [numOrange, setNumOrange] = useState(orange);
  const [numMelon, setNumMelon] = useState(melon);

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
