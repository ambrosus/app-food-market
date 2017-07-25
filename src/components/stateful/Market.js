import { connect } from 'react-redux';
import ProductContainer from '../stateless/ProductContainer/ProductContainer.jsx';

const mapStateToProps = state => {
  return {
    offers: state.offers,
  };
};

const Market = connect(mapStateToProps)(ProductContainer);

export default Market;