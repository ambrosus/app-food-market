import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './TextField.scss';
import ErrorList from '../ErrorList/ErrorList';

export default class TextField extends Component {

  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    inputType: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    errors: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    type: 'input',
    inputType: 'input',
    errors: [],
  };

  componentWillReceiveProps(nextProps) {
    const {value} = nextProps;
    if (this.props.value !== value) this.setState({ value });
  }

  onChange = e => {
    const { onChange, label } = this.props;
    const { value } = e.target;
    this.setState({ value }, onChange(label, { value }));
  };

  render() {
    const { className, placeholder, type, inputType, errors } = this.props;
    return (<div>
      {
        type === 'input'
          ? <input className={classNames(styles.input, className)}
                   type={inputType}
                   onChange={this.onChange}
                   placeholder={placeholder}
                   value={this.state.value} />
          : <textarea className={classNames(styles.input, className)}
                      onChange={this.onChange}
                      placeholder={placeholder}
                      maxLength={400}
                      value={this.state.value} />
      }
      <ErrorList errors={errors}/>
    </div>);
  }
};
