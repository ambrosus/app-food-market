import { connect } from 'react-redux';
import ProductPage from '../Pages/ProductPage/ProductPage';
import { createOffer } from '../../../redux/actions/OfferAction.js';

const mapStateToProps = state => {
  return {
    offer: state.offer,
  };
};

const Product = connect(mapStateToProps)(ProductPage);

export default Product;