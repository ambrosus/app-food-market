import React, {Component} from "react";
import styles from "./TextField.scss";

export default class TextField extends Component {

    render() {
        return (<div {...this.props}>
            <input className={styles.input} placeholder={ this.props.placeholder } type="text"/>
        </div>)
    }
}