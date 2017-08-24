import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './ErrorList.scss';

class ErrorList extends Component {

  static propTypes = {
    errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    errors: [],
  };

  render() {
    return (<ul className={classnames(
      styles.errorList, {
        [styles.showErrors]: this.props.errors.length > 0,
        [styles.hideErrors]: !this.props.errors,
      })}>
      { this.props.errors.map((error, index) =>
        (<li key={ Date.now() } className={styles.errorMessage}> {error} </li>)) }
    </ul>);
  }
}

export default ErrorList;
