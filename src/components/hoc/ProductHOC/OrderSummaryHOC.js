import { connect } from 'react-redux';
import ProductPage from '../../stateless/specific/pages/ProductPage/ProductPage';
import { approve, reject } from '../../../redux/actions/PurchaseAction';

const mapStateToProps = state => ({ offer: state.offer });

const mapDispatchToProps = (dispatch, ownProps) => ({
  approve: (agreementAddress) => {
    dispatch(approve(agreementAddress, ownProps.history));
  },

  reject: (agreementAddress) => {
    dispatch(reject(agreementAddress, ownProps.history));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
