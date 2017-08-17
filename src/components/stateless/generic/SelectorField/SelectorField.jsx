import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './SelectorField.scss';

export default class SelectorField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }

  static propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.array.isRequired,
  };

  static defaultProps = {
    onChange: () => console.log('onChange is not defined'),
    options: [],
  };

  componentDidMount() {
    this.setState({
      selected: this.props.options[0].value,
    });
  }

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
    let state = {
      selected: event.target.value,
    };
    this.setState(state, this.props.onChange.bind(this, this.props.label, state));
  }
}
