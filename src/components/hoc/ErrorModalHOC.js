import { connect } from 'react-redux';
import ErrorModal from '../stateless/specific/modals/ErrorModal/ErrorModal';
import { hideModal } from '../../redux/actions/ModalAction';

const mapStateToProps = (state) => ({
  title: state.modal.args.title,
  message: state.modal.args.message,
  reason: state.modal.args.reason,
});

const mapDispatchToProps = (dispatch) => ({
  onCancel: () => dispatch(hideModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);
