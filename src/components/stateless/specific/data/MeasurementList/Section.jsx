import React, { Component } from 'react';
import AttributeValueFieldContainer from '../../containers/AttributeValueFieldContainer/AttributeValueFieldContainer';
import styles from './Section.scss';
import Label from '../../../generic/Label/Label';

class Section extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
    };
  }

  action() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    return (<div>
      <div className={styles.header}>
        <div className={styles.icon}>
          <img onClick={this.action.bind(this)} type='image/svg+xml' src='./static/images/rectangle.svg'/>
          {this.state.expanded ?
            <img onClick={this.action.bind(this)} type='image/svg+xml' src='./static/images/angleUp.svg'
                 className={styles.arrowRotated}/> :
            <img onClick={this.action.bind(this)} type='image/svg+xml' src='./static/images/angleUp.svg'
                 className={styles.arrow}/>}
        </div>
        <Label className={styles.title} text={this.props.label}/>
        <Label className={styles.date} text={this.props.date}/>
      </div>
      <AttributeValueFieldContainer style={{
        display: this.state.expanded ? 'table' : 'none',
      }} options={this.props.options} className={styles.container}/>
    </div>);
  }
}

export default Section;
