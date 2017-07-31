import React, {Component} from "react";
import cx from "classnames";
import styles from "./SelectorField.scss";

export default class SelectorField extends Component {

    render() {
        return (<div>
            <select className={cx(styles.select, this.props.className)} 
                    ref={this.props.inputRef}
                    onChange={e => this.props.onChange(e.target.value)}>
                { this.props.options.map((option, index) => <option key={index}>{option.value}</option>)}
            </select>
        </div>)
    }
}

