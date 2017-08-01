import React, {Component} from "react";
import AttributeValueFieldContainer from "../../containers/AttributeValueFieldContainer/AttributeValueFieldContainer";
import styles from "./Section.scss";
import Label from "../../../generic/Label/Label";

class Section extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: true
        }
    }

    action() {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    render() {
        return (<div>
            <div className={styles.header}>
                <img onClick={this.action.bind(this)} type="image/svg+xml" src="./static/images/rectangle.svg"
                     className={styles.icon}/>
                <Label className={styles.title} text={this.props.label}/>
                <Label className={styles.date} text={this.props.date}/>
            </div>
            <AttributeValueFieldContainer style={{
                display: this.state.expanded ? 'table' : 'none'
            }} options={this.props.options} className={styles.container}/>
        </div>)
    }
}

export default Section;