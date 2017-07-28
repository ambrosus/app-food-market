import React, {Component} from "react";
require('./TextField.scss');

export default class ValidatedTextField extends Component {

    render() {
        return (<div {...this.props}>
            <span className="field-name">{ this.props.label }</span>
            <input placeholder={ this.props.placeholder } type="text" className="text-field"
            onChange={this.props.validate}/>
            <div className="text-line"/>
        </div>)
    }
}