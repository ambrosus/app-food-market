import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectorField from '../../../generic/SelectorField/SelectorField';
import styles from './CreateRequirementsRow.scss';
import TextField from '../../../generic/TextField/TextField';
import _ from 'lodash';

class CreateRequirementsRow extends Component {

  constructor(props) {
    super(props);
    this.options = [{ value: 'Range' }];
    this.state = {
      values: {
        id: props.id,
        decimals: props.decimals,
        type: props.type,
        min: props.min,
        max: props.max,
      },
      errors: {
        id: [],
        decimals: [],
        type: [],
        min: [],
        max: [],
      },
    };
  }

  static defaultProps = {
    showValidation: false,
  };

  static propTypes = {
    onRowRemove: PropTypes.func,
    onRowChange: PropTypes.func,
    showValidation: PropTypes.bool,
  };

  componentWillReceiveProps(prev, next) {
    if (next.showValidation) {
      this.showValidations();
    }
  }

  componentDidMount() {
    if (this.props.showValidation) {
      this.showValidations();
    }
  }

  showValidations() {
    let errors = _.chain(this.state.values)
      .map((value, key) => ({ [key]: this.handleValidation(key, value) }))
      .reduce((result, value) => _.merge(result, value))
      .value();

    let newState = Object.assign({}, this.state, { errors: errors });
    this.setState(newState);
  }

  onFieldChange(label, state) {
    let newErrors = {
      [label]: this.handleValidation(label, state.value),
    };

    let newValues = {
      [label]: state.value,
    };

    let values = Object.assign({}, this.state.values, newValues);
    let errors = Object.assign({}, this.state.errors, newErrors);

    let newState = Object.assign({}, this.state, {
      errors: errors,
      values: values,
    });

    this.setState(newState, this.props.onRowChange.bind(this, newState));
  }

  handleValidation(label, value) {

    let errors = [];

    switch (label) {
      case 'id':
        if (value === null || value === '') {
          return [...errors, 'Cannot be empty'];
        } else {
          return [];
        }

      break;
      case 'type':
        if (value === null || value === '') {
          return ['Type is not selected'];
        } else {
          return [];
        }

      break;
      case 'min':
      case 'max':
      case 'decimals':
        if (value === null || value === '') {
          return [...errors, 'Cannot be empty'];
        } else
        if (isNaN(value)) {
          return [...errors, 'It is not a number'];
        } else
          return errors;

      break;
      default:
        return errors;
    }
  }

  render() {
    return (<div className={styles.row}>
      <TextField label="id"
                 placeholder='ID'
                 value={this.state.values.id}
                 errors={this.state.errors.id}
                 onChange={this.onFieldChange.bind(this)} />
      <SelectorField label="type"
                     onChange={this.onFieldChange.bind(this)}
                     options={this.options}
                     value={this.state.values.type}
                     placeholder="Type"
                     errors={this.state.errors.type}
                     className={styles.selector}/>
      <TextField label="decimals"
                 errors={this.state.errors.decimals}
                 value={this.state.values.decimals}
                 onChange={this.onFieldChange.bind(this)}
                 placeholder='Decimals' />
      <TextField label="min"
                 value={this.state.values.min}
                 errors={this.state.errors.min}
                 onChange={this.onFieldChange.bind(this)}
                 placeholder='Min'/>
      <TextField label="max"
                 value={this.state.values.min}
                 errors={this.state.errors.max}
                 onChange={this.onFieldChange.bind(this)}
                 placeholder='Max'/>
      <img className={styles.removeIcon} onClick={this.props.onRowRemove}
           src="./static/images/transaction-rejected.svg"/>
    </div>);
  }
}

export default CreateRequirementsRow;
