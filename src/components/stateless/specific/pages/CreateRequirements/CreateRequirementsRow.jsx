import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectorField from '../../../generic/SelectorField/SelectorField';
import ValidatedTextField from '../../../generic/ValidatedTextField/ValidatedTextField';
import styles from './CreateRequirementsRow.scss';

class CreateRequirementsRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      type: '',
      min: '',
      max: '',
    };
  }

  static propTypes = {
    onRemove: PropTypes.func,
    onChange: PropTypes.func,
  };

  static defaultProps = {

  };

  render() {
    return (<div className={styles.row}>
      <ValidatedTextField placeholder='ID'
                          ref="id"
                          onChange={this.onRowChange.bind(this)} />
      <SelectorField ref="type"
                     options={[{ value: 'Range' }, { value: 'Boolean' }]}
                     className={styles.selector}/>
      <ValidatedTextField ref="decimals"
                          className={styles.selector}
                          onChange={this.onRowChange.bind(this)}
                          placeholder='Decimals' />
      <ValidatedTextField ref="min"
                          className={styles.selector}
                          onChange={this.onRowChange.bind(this)}
                          placeholder='Min'/>
      <ValidatedTextField ref="max"
                          className={styles.selector}
                          onChange={this.onRowChange.bind(this)}
                          placeholder='Max'/>
      <img className={styles.removeIcon} onClick={this.props.onRemove} src="./static/images/transaction-rejected.svg"/>
    </div>);
  }

  onRowChange() {
    console.log(this.state);
    this.setState({
      id: this.refs.id,
      type: this.refs.type.value,
      min: this.refs.min.value,
      max: this.refs.max.value,
    });
  }
}

export default CreateRequirementsRow;
