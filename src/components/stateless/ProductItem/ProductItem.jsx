import React, {Component} from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button.jsx";
import IPFSUploader from 'ipfs-image-web-upload';
import IPFS from 'ipfs';
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

    componentDidMount(){
        if (!this.props.hash)
            return;
        var ipfs = new IPFS();
        ipfs.on('ready', () => {
            var uploader = new IPFSUploader(ipfs);

            uploader.loadImage(this.refs.image, this.props.hash);
        });
    }

    render() {
        return (<article className="product">
            <img src={this.props.image} width="263" height="180" ref="image"/>
            <span className="product__name">{ this.props.name }</span>
            <div className="product__info">
                <h1 className="product__title">{ this.props.title }</h1>
                <div className="product__fields-container">
                    <span className="product__field-label">Price:</span>
                    <span className="product__field-value">{ this.props.price }</span>
                    <span className="product__field-label">Seller:</span>
                    <span className="product__field-value">{ this.props.seller }</span>
                </div>
                <div className="product__button-container">
                    <Button className="product__more-details-button" onClick={this.props.moreDetailsAction}>More
                        details</Button>
                    <Button className="product__buy-button" onClick={this.props.buyAction}>
                        <span className="icon-basket-loaded product__icon"/><span>Buy</span>
                    </Button>
                </div>
                <div style={{clear: 'both'}}></div>
            </div>
        </article>)
    }
}