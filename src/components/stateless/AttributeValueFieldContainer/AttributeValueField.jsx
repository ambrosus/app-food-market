import React, {Component} from "react";
import styles from './AttributeValueField.scss';

export default class AttributeValueField extends Component {
    render() {
        return (<div className={styles.row}>
            <span className={styles.field}>{ this.props.field }</span>
            <span className={styles.value}>{ this.props.value }</span>
        </div>)
    }
}