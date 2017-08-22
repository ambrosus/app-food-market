import { connect } from 'react-redux';
import { hideModal } from '../../redux/actions/ModalAction';
import { buy } from '../../redux/actions/PurchaseAction';
import ConfirmBuyModal from '../stateless/specific/modals/ConfirmBuyModal/ConfirmBuyModal';

const mapStateToProps = (state) => ({
  marketAddress: state.market.address,
  offer: state.offer,
  quantity: state.modal.args.quantity,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onConfirm: (marketAddress, offer, quantity) => {
    dispatch(buy(marketAddress, offer, quantity, ownProps.history));
  },

  onCancel: () => dispatch(hideModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmBuyModal);
