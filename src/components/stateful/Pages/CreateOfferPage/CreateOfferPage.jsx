import React, {Component} from "react";
import classNames from "classnames";
import NavigationBar from "../../../stateless/NavigationBar/NavigationBar.jsx";
import {Link} from "react-router-dom";
import Button from "../../../stateless/Button/Button.jsx";
import TextField from "../../../stateless/TextField/TextField.jsx";
import SearchField from "../../../stateless/SearchField/SearchField.jsx";
import styles from "./CreateOfferPage.scss";

class CreateOfferPage extends Component {
    render() {
        return (<div>
                <NavigationBar title="Create new offer">
                    <Button className={styles.cancelButton}>Cancel</Button>
                    <Button className={styles.saveButton}>Save</Button>
                </NavigationBar>
                <TextField className={classNames(styles.name, styles.element)} label="Name of object"/>
                <div className={styles.container}>
                    <div className={styles.column}>
                        <div className={styles.imageContainer}>
                            <div className={styles.verticalContainer}>
                                <div className={styles.horizontalContainer}>
                                    <img className={styles.image}
                                         src="./static/images/icon-image.png"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.column}>
                        <SearchField className={styles.label} label="Package weight"/>
                        <SearchField className={styles.label} label="Price per package (€)"/>
                        <TextField className={styles.element} label="Category"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateOfferPage;

