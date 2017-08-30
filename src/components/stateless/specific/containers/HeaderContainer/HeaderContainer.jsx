import React, { Component } from 'react';
import ContextMenu from '../../navigation/ContextMenu/ContextMenu';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../navigation/Breadcrumbs/Breadcrumbs';
import styles from './HeaderContainer.scss';
import TransactionStatusHOC from '../../../../hoc/TransactionStatusHOC';

export default class HeaderContainer extends Component {
  render() {
    return this.props.location.pathname !== '/product-batch' ? (
      <div className={styles.header}>
        <Link className={styles.logo} to='/'>
          <img className={styles.logo} src='/static/images/logotype.png'/>
        </Link>
        <TransactionStatusHOC/>
        <ContextMenu location={this.props.location.pathname}/>
        <hr className={styles.line}/>
        <Breadcrumbs className={styles.breadcrumbs}/>
      </div>
    ) : (
      <div className={styles.header}>
        <Link className={styles.logo} to='/'>
          <img className={styles.logo} src='/static/images/logotype.png'/>
        </Link>
      </div>
    );
  }
}
