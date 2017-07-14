import React from 'react';
import ReactDOM from 'react-dom';
import RootComponent from './components/RootComponent.jsx';
require('./styles/index.scss');
require.context('./static/images/', true);

ReactDOM.render(<RootComponent/>, document.getElementById('container'));