import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectorField from '../../../generic/SelectorField/SelectorField';
import ValidatedTextField from '../../../generic/ValidatedTextField/ValidatedTextField';
import styles from './CreateRequirementsRow.scss';

class CreateRequirementsRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: null,
      decimals: null,
      type: null,
      min: null,
      max: null,
    };
  }

  static propTypes = {
    onRemove: PropTypes.func,
    onChange: PropTypes.func,
  };

  render() {
    return (<div className={styles.row}>
      <ValidatedTextField ref="id"
                          placeholder='ID'
                          onChange={this.onFieldChange.bind(this)} />
      <SelectorField ref="type"
                     onChange={this.onFieldChange.bind(this)}
                     options={[{ value: 'Range' }, { value: 'Boolean' }]}
                     className={styles.selector}/>
      <ValidatedTextField ref="decimals"
                          className={styles.selector}
                          onChange={this.onFieldChange.bind(this)}
                          placeholder='Decimals' />
      <ValidatedTextField ref="min"
                          className={styles.selector}
                          onChange={this.onFieldChange.bind(this)}
                          placeholder='Min'/>
      <ValidatedTextField ref="max"
                          className={styles.selector}
                          onChange={this.onFieldChange.bind(this)}
                          placeholder='Max'/>
      <img className={styles.removeIcon} onClick={this.props.onRemove} src="./static/images/transaction-rejected.svg"/>
    </div>);
  }

  onFieldChange() {
    this.setState({
      id: this.refs.id.state.value,
      type: this.refs.type.state.selected,
      decimals: this.refs.decimals.state.value,
      min: this.refs.min.state.value,
      max: this.refs.max.state.value,
    }, this.props.onChange);
  }
}

export default CreateRequirementsRow;
