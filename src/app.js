import React from 'react';
import ReactDOM from 'react-dom';
import RootComponent from './components/RootComponent.jsx';
import { createStore, applyMiddleware } from 'redux';
import marketReducer from './redux/reducers/index.js';
import thunkMiddleware from 'redux-thunk';
import getAllOffers from './redux/actions/MarketAction.js';
require.context('./static/images/', true);

const store = createStore(
  marketReducer,
  applyMiddleware(
    thunkMiddleware
  )
)

store.dispatch(getAllOffers('0x335d7cb39b2ef2fc0c24045658543ca2daad70e4'));



ReactDOM.render(<RootComponent store={store}/>, document.getElementById('container'));