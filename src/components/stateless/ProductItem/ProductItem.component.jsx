import React, {Component} from "react";
import image from "../../../../static/images/fish.png";
import styles from './ProductItem.css';

export default class ProductItem extends Component {
    render() {
        return (<article className="product">
            <img src={image} width="263" height="180" alt=""/>
            <span className="product__name">Tuna</span>
            <div className="product__info">
                <h1 className="product__title">Lorem ipsum Dolor sit amet</h1>
                <div className="flex">
                    <span className="product__span--gray">Price:</span><span className="product__span">€25 / kg</span>
                    <span className="product__span--gray">Seller:</span><span className="product__span">Johnston Ltd.</span>
                </div>
                <a href="more.html" className="product__button--gray"><span>More details</span></a>
                <a href="buy.html" className="product__button--yellow"><span className="icon-basket-loaded product__icon"
                                                                             aria-hidden="true"></span><span>Buy</span></a>
                <div style={{clear: 'both'}}></div>
            </div>
        </article>)
    }
}