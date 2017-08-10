import React from 'react';
import ReactDOM from 'react-dom';
import RootComponent from './components/RootComponent';
import ensureHttps from './utils/ensureHttps.js';
require.context('./static/images/', true);

if (ensureHttps()) {
  ReactDOM.render(<RootComponent/>, document.getElementById('container'));
}
