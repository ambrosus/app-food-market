import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './Breadcrumbs.scss';

export default class Breadcrumbs extends Component {

    render() {
        return (<div className={cx(styles.breadcrumbs, this.props.className)}>Market > Fish > Champion</div>)
    }
}