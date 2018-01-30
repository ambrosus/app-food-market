import React, { Component } from 'react';
import contractClient from '../../../../../utils/contractClient';
import styles from './PageContainer.scss';

export default class PageContainer extends Component {
  componentWillMount() {
    contractClient.init();
  }

  render() {
    return (<div className={styles.pageContainer} {...this.props} >{this.props.children}</div>);
  }
};
