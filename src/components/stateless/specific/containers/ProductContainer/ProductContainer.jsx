import React, {Component} from "react";
import ProductItem from "../../pages/ProductPage/ProductItem/ProductItem";
import {Link} from "react-router-dom"
import styles from './ProductContainer.scss';

class ProductContainer extends Component {

    componentDidMount() {
        this.props.onMount(this.props.market.address);
    }

    render() {
        let offers = this.props.offers;
        if (!this.props.market.address) {
            return (<p>Opsss.. No market yet.
                <Link to="/create-market">
                    Create
                </Link> one.
            </p>)
        } else if (this.props.market.status === 'Loading') {
            return (
                <img className={styles.spinner} src="./static/images/spinner.svg"/>
            );
        }
        else if (this.props.market.offers.length === 0) {
            return (<p>There are no offers on the market yet.
                <Link to="/create-offer">
                    Create
                </Link>
                first.
            </p>)
        }
        return (
            <div className={styles.container}>
                {offers.map((offer, index) =>
                    <ProductItem
                        key={index}
                        offer={offer}
                        moreDetailsAction={this.props.moreDetailsAction}
                    />)
                }
            </div>
        );
    }
}

export default ProductContainer;
