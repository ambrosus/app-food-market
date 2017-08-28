import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './ContextMenu.scss';
import classnames from 'classnames';

export default class ContextMenu extends Component {

  render() {
    return (<div className={styles.contextMenu}>
      <ul>
        <li className={styles.element}><Link className={classnames(styles.link, {
          [styles.active]: this.props.location === '/market',
        })} to='/market'>Market</Link></li>
        <li className={styles.element}><Link className={classnames(styles.link, {
          [styles.active]: this.props.location === '/orders',
        })} to='/orders'>Orders</Link></li>
        <li className={styles.element}><Link className={classnames(styles.link, {
          [styles.active]: this.props.location === '/profile',
        })} to='/profile'>Profile</Link></li>
      </ul>
    </div>);
  }
};
