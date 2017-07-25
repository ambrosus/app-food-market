import React, {Component} from "react";
import classNames from "classnames";
import NavigationBar from "../../../stateless/NavigationBar/NavigationBar.jsx";
import {Link} from "react-router-dom";
import Button from "../../../stateless/Button/Button.jsx";
import TextField from "../../../stateless/TextField/TextField.jsx";
import styles from "./CreateOfferPage.scss";

class CreateOfferPage extends Component {
    render() {
        return (<div>
            <NavigationBar title="Create new offer">
                <Button className={styles.cancelButton}>Cancel</Button>
                <Button className={styles.saveButton}>Save</Button>
            </NavigationBar>
            <TextField className={classNames(styles.name,styles.element)} label="Name of object"/>
            <div className={styles.container}>
                <div className={styles.column}>
                    <div className={styles.image}/>
                </div>
                <div className={styles.column}>
                    <TextField className={styles.element} label="Package weight"/>
                    <TextField className={styles.element} label="Category"/>
                    <TextField className={styles.element} label="Price per package (€)"/>
                </div>
            </div>
        </div>)
    }
}

export default CreateOfferPage;

