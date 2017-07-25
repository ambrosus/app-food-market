import React from 'react';
import ReactDOM from 'react-dom';
import RootComponent from './components/RootComponent.jsx';
import Ambrosus from 'ambrosus'
global.Ambrosus = Ambrosus;
require.context('./static/images/', true);

ReactDOM.render(<RootComponent/>, document.getElementById('container'));
