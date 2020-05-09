import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import { handleInitialization, handleWindowResize } from './handlers';

// initialize scene
handleInitialization();

// start and add resize handler
handleWindowResize();
window.addEventListener('resize', handleWindowResize, false);

ReactDOM.render(<App />, document.getElementById('app'));
