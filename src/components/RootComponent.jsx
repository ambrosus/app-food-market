import React, { Component } from 'react';
import ProductContainer from './stateful/ProductContainer/ProductContainer.jsx';
require('./RootComponent.scss');

export default class RootComponent extends Component {
    render() {
        return <div className="root-container"><ProductContainer/></div>
    }
}