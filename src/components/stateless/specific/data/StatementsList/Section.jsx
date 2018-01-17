import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Section.scss';
import Label from '../../../generic/Label/Label';

class Section extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  };

  render() {
    const {date, text} = this.props;
    return (<div className={styles.listItem}>
      <Label className={styles.date} text={date}/>
      <p className={styles.text}>{text}</p>
    </div>);
  }
}

export default Section;
