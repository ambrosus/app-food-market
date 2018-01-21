import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './FadeTransition.scss';


export default class FadeTransition extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return (<ReactCSSTransitionGroup
      transitionName='fade'
      component='div'
      className={styles.container}
      transitionAppearTimeout={400}
      transitionAppear={true}
      transitionEnter={false}
      transitionLeave={false}>
      {this.props.children}
    </ReactCSSTransitionGroup>);
  }
}
