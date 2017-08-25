import React, { Component } from 'react';
import classnames from 'classnames';

class CreateRequirementsForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className={classnames(this.props.className)}>{this.props.children}</div>);
  }
}

export default CreateRequirementsForm;
