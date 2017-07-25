import React, {Component} from "react";
import styles from "./AttributeValueFieldContainer.scss";

export default class AttributeValueFieldContainer extends Component {

    render() {
        return (<div className={styles.container} {...this.props}>{ this.props.children }</div>)
    }
}