import { hideModal } from '../../redux/actions/ModalAction';
import { connect } from 'react-redux';
import TransactionProgressModal from '../stateless/specific/modals/TransactionProgressModal/TransactionProgressModal';

const mapStateToProps = (state) => ({
    title: state.modal.args.title,
    message: state.modal.args.message,
  });

const mapDispatchToProps = (dispatch) => ({
  onConfirm: () => console.log('not yet implemented'),
  onCancel: () => dispatch(hideModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionProgressModal);

