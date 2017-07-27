import React, {Component} from "react";
import { Link } from 'react-router-dom';
require('./Breadcrumbs.scss');

export default class Breadcrumbs extends Component {

    render() {
        return (<div className="breadcrumbs">Market > Fish > Champion</div>)
    }
}