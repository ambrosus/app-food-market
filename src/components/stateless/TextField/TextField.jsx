import React, {Component} from "react";
import styles from "./TextField.scss";
import cx from "classnames";

export default class TextField extends Component {

    render() {
        return (<div>
            <input  className={cx(styles.input, this.props.className)}
                    placeholder={ this.props.placeholder }
                    onChange={this.props.validate}
                    ref={this.props.inputRef} 
                    type="text"/>
            <span>{this.props.error}</span>
          </div>);
    }
}