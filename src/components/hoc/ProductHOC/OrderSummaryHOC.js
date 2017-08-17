import { connect } from 'react-redux';
import ProductPage from '../../stateless/specific/pages/ProductPage/ProductPage';
import { approve, reject } from '../../../redux/actions/PurchaseAction';

const mapStateToProps = state => ({ offer: state.offer });

const mapDispatchToProps = dispatch => ({
  approve: (agreementAddress) => {
    dispatch(approve(agreementAddress));
  },

  reject: (agreementAddress) => {
    dispatch(reject(agreementAddress));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
