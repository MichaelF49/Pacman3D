/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import { globals } from '../global';

const MusicButton = () => {
  const [muted, setMuted] = useState(globals.isMuted);

  const icon = muted ? (
    <span role='img' aria-label='muted_speaker'>
      🔈
    </span>
  ) : (
    <span role='img' aria-label='speaker'>
      🔊
    </span>
  );

  return (
    <button
      className='musicButton'
      onClick={() => {
        // make the button lose focus
        // otherwise, this interferes with shooting due to space button
        document.activeElement.blur();

        if (globals.victory || globals.defeat) {
          return;
        }

        if (muted) {
          globals.globalMusic.setVolume(0.05);
        } else {
          globals.globalMusic.setVolume(0);
        }

        globals.isMuted = !globals.isMuted;
        setMuted(!muted);
      }}
      type='button'
    >
      {icon}
    </button>
  );
};

export default MusicButton;
