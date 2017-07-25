import React, {Component} from "react";
require('./SearchField.scss');

export default class SearchField extends Component {

    render() {
        return (<div {...this.props}>
            <span className="field-name">{ this.props.label }</span>
            <input placeholder={ this.props.placeholder } type="text" className="text-field"/>
            <div className="text-line"/>
        </div>)
    }
}