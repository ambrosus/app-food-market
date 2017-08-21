import { connect } from 'react-redux';
import ProductPage from '../stateless/specific/pages/ProductPage/ProductPage';
import { showModal } from '../../redux/actions/ModalAction';
import { fetchAttributes } from '../../redux/actions/AttributesAction';

const mapStateToProps = state => ({
  offer: state.offer,
  sidebar: 'buy',
  requirements: state.requirementsAttributes,
});

const mapDispatchToProps = (dispatch) => ({

  onBuy: (offer, quantity) => {
    dispatch(showModal('ConfirmBuyModal', { quantity }));
  },

  getAttributes: (requirementsAddress) => {
    dispatch(fetchAttributes(requirementsAddress));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
