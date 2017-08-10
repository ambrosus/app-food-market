import React, { Component } from 'react';
import styles from './NavigationBar.scss';

export default class NavigationBar extends Component {
  render() {
    return (<div className={styles.navigation}>
      <span className={styles.title}>{this.props.title} </span>
      {this.props.children}
    </div>);
  }
};
