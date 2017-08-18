import { connect } from 'react-redux';
import ProductPage from '../../stateless/specific/pages/ProductPage/ProductPage';

const mapStateToProps = state => ({
  offer: state.offer,
  sidebar: 'progress',
});

export default connect(mapStateToProps)(ProductPage);
