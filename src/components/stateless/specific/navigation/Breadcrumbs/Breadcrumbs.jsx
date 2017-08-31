import React, { Component } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import styles from './Breadcrumbs.scss';

export default class Breadcrumbs extends Component {

  render() {
    return (<div className={cx(styles.breadcrumbs, this.props.className)}>
      {
        _(this.props.breadcrumbs)
          .dropRight()
          .map(page => (<span className={styles.breadcrumbs} key={page.to}>
              <Link className={styles.link} to={page.to}>{page.name}</Link> &gt;&nbsp;
            </span>))
          .concat(<span className={styles.breadcrumbs} key=''>{_.last(this.props.breadcrumbs).name}</span>)
          .value()
      }
    </div>);
  }
};
