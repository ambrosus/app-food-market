import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectorField from '../../../generic/SelectorField/SelectorField';
import styles from './CreateRequirementsRow.scss';
import TextField from '../../../generic/TextField/TextField';

class CreateRequirementsRow extends Component {

  constructor(props) {
    super(props);
    this.options = [{ value: 'Range' }, { value: 'Boolean' }];
    this.state = {
      id: null,
      decimals: null,
      type: null,
      min: null,
      max: null,
      errors: {
        id: [],
        decimals: [],
        type: [],
        min: [],
        max: [],
      },
    };
  }

  static propTypes = {
    onRowRemove: PropTypes.func,
    onRowChange: PropTypes.func,
  };

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
      default:
        return errors;
    }
  }

  render() {
    return (<div className={styles.row}>
      <TextField label="id"
                 placeholder='ID'
                 errors={this.state.errors.id}
                 onChange={this.onFieldChange.bind(this)} />
      <SelectorField label="type"
                     onChange={this.onFieldChange.bind(this)}
                     options={this.options}
                     placeholder="Type"
                     errors={this.state.errors.type}
                     className={styles.selector}/>
      <TextField label="decimals"
                 className={styles.selector}
                 errors={this.state.errors.decimals}
                 onChange={this.onFieldChange.bind(this)}
                 placeholder='Decimals' />
      <TextField label="min"
                 className={styles.selector}
                 errors={this.state.errors.min}
                 onChange={this.onFieldChange.bind(this)}
                 placeholder='Min'/>
      <TextField label="max"
                 className={styles.selector}
                 errors={this.state.errors.max}
                 onChange={this.onFieldChange.bind(this)}
                 placeholder='Max'/>
      <img className={styles.removeIcon} onClick={this.props.onRowRemove}
           src="./static/images/transaction-rejected.svg"/>
    </div>);
  }

  onFieldChange(label, state) {
    let newErrors = {
      [label]: this.handleValidation(label, state.value),
    };
    let errors = Object.assign({}, this.state.errors, newErrors);
    let newState = Object.assign({}, this.state, {
      errors: errors,
    });
    this.setState(newState, this.props.onRowChange.bind(this, state));
  }
}

export default CreateRequirementsRow;
