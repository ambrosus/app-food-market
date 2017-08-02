import React, {Component} from "react";
import { Link } from 'react-router-dom';
import styles from './ContextMenu.scss';

export default class ContextMenu extends Component {

    render() {
        return (<div className={styles.contextMenu}>
            <ul>
                <li className={styles.element}><Link className={styles.link} to="/market">Market</Link></li>
                <li className={styles.element}><Link className={styles.link} to="/orders">Orders</Link></li>
                <li className={styles.element}><Link className={styles.link} to="/profile">Profile</Link></li>
            </ul>
        </div>)
    }
}