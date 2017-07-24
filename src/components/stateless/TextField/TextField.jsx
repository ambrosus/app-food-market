import React, {Component} from "react";
require('./TextField.scss');

export default class TextField extends Component {

    render() {
        return (<div {...this.props}>
            <span className="field-name">{ this.props.label }</span>
            <input placeholder={ this.props.placeholder } type="text" className="text-field"/>
            <div className="text-line"/>
        </div>)
    }
}