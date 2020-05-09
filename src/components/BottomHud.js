import React, { useState } from 'react';

import globals from '../global/globals';

import image from '../images/heart.png';

const BottomHud = ({ hearts }) => {
  const [numHearts, setNumHearts] = useState(hearts);

  globals.updateHearts = (hearts_) => {
    setNumHearts(hearts_);
  };

  const heartElem = [];
  for (let i = 0; i < numHearts; i += 1) {
    heartElem.push(
      <img
        key={i}
        className='heart-img'
        src={image}
        alt='HP'
        style={{ width: 60, height: 60 }}
      />
    );
  }

  return <p className='bottom-hud'>{heartElem}</p>;
};

export default BottomHud;
