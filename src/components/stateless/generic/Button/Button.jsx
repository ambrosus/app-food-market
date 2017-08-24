import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './Button.scss';

export default class Button extends Component {

  static defaultProps = {
    enabled: true,
  };

  render() {
    return (<div onClick={this.props.onClick} className={classnames(styles.button, this.props.className)}>
      {this.props.children}</div>);
  }
};
