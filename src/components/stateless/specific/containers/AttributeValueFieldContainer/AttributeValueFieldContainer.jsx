import React, {Component} from "react";
import PropTypes from "prop-types";
import cx from 'classnames';
import styles from "./AttributeValueFieldContainer.scss";
import AttributeValueField from "./AttributeValueField";

export default class AttributeValueFieldContainer extends Component {

    static propTypes = {
        options: PropTypes.array.isRequired
    };

    static defaultProps = {
        options: []
    };

    render() {
        return (<div {...this.props} className={cx(styles.container, this.props.className)}>
            {this.props.options.map((element, index) => (
                <AttributeValueField key={index} field={element.field} value={element.value}/>)
            )}</div>)
    }
}