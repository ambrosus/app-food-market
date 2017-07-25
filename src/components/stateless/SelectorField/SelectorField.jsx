import React, {Component} from "react";
import styles from './SelectorField.scss';

export default class SelectorField extends Component {

    render() {
        return (<div {...this.props}>
            <span>{ this.props.label }</span>
            <select className={styles.select}>
                <option>Channel catfish</option>
                <option>Char</option>
                <option>Cherry salmon</option>
                <option>Chimaera</option>
                <option>Pilchard</option>
                <option>Pilot fish</option>
                <option>Pineapplefish</option>
                <option>Pineconefish</option>
                <option>Pink salmon</option>
                <option>Píntano</option>
                <option>Pipefish</option>
                <option>Piranha</option>
                <option>Pirarucu</option>
            </select>
        </div>)
    }
}

