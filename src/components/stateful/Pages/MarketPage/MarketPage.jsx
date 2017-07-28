import {Link} from "react-router-dom";
import React, {Component} from "react";
import NavigationBar from "../../../stateless/NavigationBar/NavigationBar";
import Market from "../../Market/Market.js";
import SelectorField from "../../../stateless/SelectorField/SelectorField";
import Button from "../../../stateless/Button/Button";
import Label from "../../../stateless/Label/Label";
import styles from './MarketPage.scss';

let MarketPage = () => (
    <div>
        <NavigationBar title="Market">
            <Label text="Quality:"/>
            <SelectorField className={styles.selector} options={[
                {value: 'Poor'},
                {value: 'Good'}]
            } label="Category"/>
            <Label text="Categories:"/>
            <SelectorField className={styles.selector} options={[
                {value: 'Fish'},
                {value: 'Shrimps'}]
            } label="Category"/>
            <Link className="navigation__link" to="/create-offer"><Button
                className='navigation__create-offer-button'>
                <span className="icon-basket-loaded button-icon-default"/>Create an offer</Button>
            </Link>
        </NavigationBar>
        <Market/>
    </div>
);

export default MarketPage;