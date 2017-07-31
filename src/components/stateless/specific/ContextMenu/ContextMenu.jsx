import React, {Component} from "react";
import { Link } from 'react-router-dom';
require('./ContextMenu.scss');

export default class ContextMenu extends Component {

    render() {
        return (<div className="context-menu">
            <ul className="context-menu__list">
                <li className="context-menu__element"><Link className="context-menu__link" to="/product-info">Product</Link></li>
                <li className="context-menu__element"><Link className="context-menu__link" to="/market">Market</Link></li>
                <li className="context-menu__element"><Link className="context-menu__link" to="/orders">Orders</Link></li>
                <li className="context-menu__element"><Link className="context-menu__link" to="/profile">Profile</Link></li>
                <li className="context-menu__element"><Link className="context-menu__link" to="/modal">Modal</Link></li>
            </ul>
        </div>)
    }
}