import React, { Component } from 'react';
import MainMarket from './stateful/MainMarket/MainMarket.component';

export default class RootComponent extends Component {
    render() {
        return <div>Root Component<MainMarket/></div>
    }
}