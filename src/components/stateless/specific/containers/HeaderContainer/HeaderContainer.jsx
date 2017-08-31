import React, { Component } from 'react';
import ContextMenu from '../../navigation/ContextMenu/ContextMenu';
import { Link } from 'react-router-dom';
import styles from './HeaderContainer.scss';
import TransactionStatusHOC from '../../../../hoc/TransactionStatusHOC';
import BreadcrumbsHOC from '../../../../hoc/BreadcrumbsHOC';

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
        <BreadcrumbsHOC className={styles.breadcrumbs} location={this.props.location.pathname}/>
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
