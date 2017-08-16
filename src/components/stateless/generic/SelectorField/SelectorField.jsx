import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './SelectorField.scss';

export default class SelectorField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.options[0],
    };
  }

  static propTypes = {
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: () => console.log('onChange is not defined'),
    options: [],
  };

  render() {
    return (<div>
      <select className={classnames(styles.select, this.props.className)}
              onChange={this.onChange.bind(this)}
              value={this.props.value}>
        {this.props.options.map((option, index) => <option key={index}>{option.value}</option>)}
      </select>
    </div>);
  }

  onChange(event) {
    this.setState({
      selected: event.target.value,
    }, this.props.onChange);
  }
}
