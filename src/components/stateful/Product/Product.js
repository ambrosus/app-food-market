import { connect } from 'react-redux';
import ProductPage from '../../stateless/specific/pages/ProductPage/ProductPage';

const mapStateToProps = state => {
  return {
    offer: state.offer,
  };
};

const Product = connect(mapStateToProps)(ProductPage);

export default Product;