import React, {Component} from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button.jsx";
require('./ProductItem.scss');

export default class ProductItem extends Component {

    static propTypes = {
        name: PropTypes.string,
        price: PropTypes.string,
        seller: PropTypes.string,
        title: PropTypes.string,
        image: PropTypes.string,
        moreDetailsAction: PropTypes.func.isRequired,
        buyAction: PropTypes.func.isRequired
    };

    static defaultProps = {
        name: 'Tuna',
        price: '€20 / kg',
        title: 'Nord atlantic tuna',
        seller: 'Riverscott',
        image: '/static/images/placeholder.png',
        moreDetailsAction: () => {
            console.warn('Warning: More details action is not defined')
        },
        buyAction: () => {
            console.warn('Warning: Buy action is not defined')
        },
    };

    render() {
        return (<article className="product">
            <img src={this.props.image} width="263" height="180"/>
            <span className="product__name">{ this.props.name }</span>
            <div className="product__info">
                <h1 className="product__title">{ this.props.title }</h1>
                <div className="flex">
                    <span className="product__span--gray">Price:</span><span
                    className="product__span">{ this.props.price }</span>
                    <span className="product__span--gray">Seller:</span><span
                    className="product__span">{ this.props.seller }</span>
                </div>
                <Button className="product__button--gray" onClick={this.props.moreDetailsAction}>More details</Button>
                <Button className="product__button--yellow" onClick={this.props.buyAction}>
                    <span className="icon-basket-loaded product__icon"/><span>Buy</span>
                </Button>
                <div style={{clear: 'both'}}></div>
            </div>
        </article>)
    }
}