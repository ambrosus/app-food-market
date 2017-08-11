import React, { Component } from 'react';
import styles from './PageContainer.scss';

export default class PageContainer extends Component {
  render() {
    return (<div className={styles.pageContainer} {...this.props} >{this.props.children}</div>);
  }
};
