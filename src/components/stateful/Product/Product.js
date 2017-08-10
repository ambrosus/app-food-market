import { connect } from 'react-redux';
import ProductPage from '../../stateless/specific/pages/ProductPage/ProductPage';

const mapStateToProps = state => {
  return {
    offer: state.offer,
  };
};

export default connect(mapStateToProps)(ProductPage);
