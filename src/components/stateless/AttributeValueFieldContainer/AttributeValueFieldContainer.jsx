import React, {Component} from "react";
import cx from 'classnames';
import styles from "./AttributeValueFieldContainer.scss";

export default class AttributeValueFieldContainer extends Component {

    render() {
        return (<div className={cx(styles.container, this.props.className)}>{ this.props.children }</div>)
    }
}