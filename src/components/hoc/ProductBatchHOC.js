import { connect } from 'react-redux';
import { showModal } from '../../redux/actions/ModalAction';
import { fetchAttributes } from '../../redux/actions/AttributesAction';
import ProductBatch from '../stateless/specific/pages/ProductPage/ProductBatch/ProductBatch';

const mapStateToProps = state => ({
  offer: state.offer,
  sidebar: 'buy',
  requirements: state.requirementsAttributes,
  decimals: state.token.decimals,
});

const mapDispatchToProps = (dispatch) => ({

  onBuy: (offer, quantity) => {
    dispatch(showModal('ConfirmBuyModal', { quantity }));
  },

  getAttributes: (requirementsAddress) => {
    dispatch(fetchAttributes(requirementsAddress));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductBatch);
