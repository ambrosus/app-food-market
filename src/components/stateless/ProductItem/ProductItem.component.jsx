import React, {Component} from "react";
require('./ProductItem.css');

export default class ProductItem extends Component {

    static propTypes = {
        name: React.PropTypes.string,
        price: React.PropTypes.string,
        seller: React.PropTypes.string,
        title: React.PropTypes.string,
        image: React.PropTypes.string,
    };

    static defaultProps = {
        name: 'Tuna',
        price: '€20 / kg',
        title: 'Nord atlantic tuna',
        seller: 'Riverscott'
    };

    render() {
        return (<article className="product">
            <img src={this.props.image} width="263" height="180"/>
            <span className="product__name">{ this.props.name }</span>
            <div className="product__info">
                <h1 className="product__title">{ this.props.title }</h1>
                <div className="flex">
                    <span className="product__span--gray">Price:</span><span className="product__span">{ this.props.price }</span>
                    <span className="product__span--gray">Seller:</span><span className="product__span">{ this.props.seller }</span>
                </div>
                <a href="more.html" className="product__button--gray"><span>More details</span></a>
                <a href="buy.html" className="product__button--yellow"><span className="icon-basket-loaded product__icon"
                                                                             aria-hidden="true"></span><span>Buy</span></a>
                <div style={{clear: 'both'}}></div>
            </div>
        </article>)
    }
}