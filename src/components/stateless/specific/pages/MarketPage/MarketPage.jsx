import {Link} from "react-router-dom";
import React, {Component} from "react";
import NavigationBar from "../../navigation/NavigationBar/NavigationBar";
import Market from "../../../../stateful/Market/Market.js";
import SelectorField from "../../../generic/SelectorField/SelectorField";
import Button from "../../../generic/Button/Button";
import Label from "../../../generic/Label/Label";
import styles from './MarketPage.scss';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};


class MarketPage extends Component {

    getCategories() {
        return this.props.categories.map( (key) => { return {value: key } } )
    }

    getQualities() {
        return [{value: 'All'}, {value: 'Poor'}, {value: 'Good'}];
    }

    render() {
        return (
            <div>
                <NavigationBar title="Market">
                    <Label text="Quality:"/>
                    <SelectorField className={styles.selector} options={ this.getQualities() } 
                        label="Quality" onChange={this.props.qualityChange}
                        value={this.props.filter.quality}/>
                    <Label text="Categories:"/>
                    <SelectorField className={styles.selector} options={ this.getCategories() } label="Category"
                      onChange={this.props.categoryChange}
                      value={this.props.filter.category}/>
                    <Link className="navigation__link" to="/create-offer"><Button
                        className='navigation__create-offer-button'>
                        <span className="icon-basket-loaded button-icon-default"/>Create an offer</Button>
                    </Link>
                </NavigationBar>
                <Market/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketPage);