import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './TextField.scss';

export default class TextField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  static propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  render() {
    return (<div {...this.props} >
      <input ref="input"
             className={classNames(styles.input, this.props.className)}
             onChange={()=> {
                this.onChange();
                this.props.onChange();
              }}

             placeholder={this.props.placeholder}
             value={this.props.value} />
    </div>);
  }

  onChange() {
    this.setState({
      value: this.refs.input.value,
    });
  }
};
