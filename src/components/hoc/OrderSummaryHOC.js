import { connect } from 'react-redux';
import ProductPage from '../stateless/specific/pages/ProductPage/ProductPage';
import { approve, reject } from '../../redux/actions/PurchaseAction';
import { fetchAttributes } from '../../redux/actions/AttributesAction';

const mapStateToProps = state => ({
  offer: state.offer,
  requirements: state.requirementsAttributes,
  decimals: state.token.decimals,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  approve: (agreementAddress) => {
    dispatch(approve(agreementAddress, ownProps.history));
  },

  reject: (agreementAddress) => {
    dispatch(reject(agreementAddress, ownProps.history));
  },

  getAttributes: (requirementsAddress) => {
    dispatch(fetchAttributes(requirementsAddress));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
