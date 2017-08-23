import { connect } from 'react-redux';
import ProductPage from '../stateless/specific/pages/ProductPage/ProductPage';
import { fetchAttributes } from '../../redux/actions/AttributesAction';

const mapStateToProps = state => ({
  offer: state.offer,
  sidebar: 'progress',
  requirements: state.requirementsAttributes,
  decimals: state.token.decimals,
});

const mapDispatchToProps = (dispatch) => ({
  getAttributes: (requirementsAddress) => {
    dispatch(fetchAttributes(requirementsAddress));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
