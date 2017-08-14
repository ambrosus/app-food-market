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
                          id='id'
                          onChange={this.onChange} />
      <SelectorField
        options={[{ value: 'Range' }, { value: 'Boolean' }]}
        className={styles.selector}/>
      <ValidatedTextField className={styles.selector}
                          placeholder='Decimals' />
      <ValidatedTextField className={styles.selector}
                          placeholder='Min' />
      <ValidatedTextField className={styles.selector}
                          placeholder='Max' />
      <span onClick={this.props.onRemove}>Remove</span>
    </div>);
  }
}

export default CreateRequirementsRow;
