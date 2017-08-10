import React, { Component } from 'react';
import styles from './PageContainer.scss';

export default class PageContainer extends Component {

  onClick() {
    console.log('onClick');
  }

  render() {
    return (<div onClick={this.onClick.bind(this)}
                 className={styles.pageContainer} {...this.props} >{this.props.children}</div>);
  }
};
