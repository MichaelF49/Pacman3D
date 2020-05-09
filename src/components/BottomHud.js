import React, { useState } from 'react';

import { globals } from '../global';
import { HeartPNG } from '../images';

const BottomHud = () => {
  const [numHearts, setNumHearts] = useState(globals.pacman.health);

  globals.updateHearts = () => {
    setNumHearts(globals.pacman.health);
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

  return <p className='bottom-hud'>{heartElem}</p>;
};

export default BottomHud;
