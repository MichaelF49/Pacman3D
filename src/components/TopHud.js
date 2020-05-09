import React, { useState } from 'react';

import globals from '../global/globals';

const TopHud = ({ orange, melon }) => {
  const [numOrange, setNumOrange] = useState(orange);
  const [numMelon, setNumMelon] = useState(melon);

  globals.updateAmmo = (orange_, melon_) => {
    setNumOrange(orange_);
    setNumMelon(melon_);
  };

  return (
    <p className='top-hud'>
      Cherries: inf, Oranges: {numOrange}, Melons: {numMelon}
    </p>
  );
};

export default TopHud;
