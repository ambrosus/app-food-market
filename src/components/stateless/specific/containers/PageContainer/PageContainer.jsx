import React, {Component} from "react";
require('./PageContainer.scss');

export default class PageContainer extends Component {

    render() {
        return (<div className="page-container" {...this.props} >{ this.props.children }</div>)
    }
}