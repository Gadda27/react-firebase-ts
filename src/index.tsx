import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './App';
import Firebase, { FirebaseContext } from './components/Firebase';

const fb = new Firebase();

ReactDOM.render(
  <FirebaseContext.Provider value={fb}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();