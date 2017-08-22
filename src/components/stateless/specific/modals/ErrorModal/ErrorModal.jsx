import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './ErrorModal.scss';
import Label from '../../../generic/Label/Label';

class ErrorModal extends Component {

  static defaultProps = {
    state: null,
    title: 'Operation unsuccessful',
    message: 'We were unable to perform operation this time.',
    reason: 'Reason unknown.',
    onCancel: () => {
      console.info('onCancel not defined in ', ErrorModal);
    },
  };

  static propTypes = {
    state: PropTypes.string,
    onCancel: PropTypes.func,
    title: PropTypes.string,
    message: PropTypes.string,
    reason: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  };

  render() {
    return (<div>
      <div onClick={this.props.onCancel} className={cx(styles.modal, this.props.className)}>
        <div className={styles.inner}>
          <img src='./static/images/iconError.svg' className={styles.icon}/>
          <Label className={styles.title} text={this.props.title}/>
          <p>
            {this.props.message}
          </p>
          <p className={styles.description}>
            {this.props.reason.toString()}
          </p>
        </div>
      </div>
    </div>);
  }
}

export default ErrorModal;
