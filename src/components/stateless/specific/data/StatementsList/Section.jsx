import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Section.scss';
import Label from '../../../generic/Label/Label';

class Section extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.string,
    date: PropTypes.string,
    from: PropTypes.string,
    type: PropTypes.string,
  };

  static defaultProps = {
    date: '',
    type: '0',
    from: '',
  }

  render() {
    const {date, data, type, from, id} = this.props;
    const isFile = type === '1';
    const [fullDate] = date.split('T').join(' ').split('.');
    return (<div className={styles.listItem}>
      <Label className={styles.dateField} text={fullDate.slice(0, -3)}/>
      <p className={styles.fromField}>From: {from}</p>
      {isFile ? <p className={styles.fileName}>File name: {data}</p> : <p>Message: {data}</p>}
      {isFile && id ? <a className={styles.downloadLink}
                         href={`https://amb.482.solutions/files/statement/${id}`}
                         download={data}>download file</a> : null}
    </div>);
  }
}

export default Section;
