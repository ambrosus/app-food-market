import { connect } from 'react-redux';
import CreateOfferPage from '../Pages/CreateOfferPage/CreateOfferPage.jsx';
import { executeEthereumTransaction } from '../../../redux/actions/TransactionAction.js';
import { createOffer } from '../../../redux/actions/OfferAction.js';
import Ambrosus from 'ambrosus';

const mapStateToProps = state => {
  return {
    address: state.market.address,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAdd: (offer, image, marketAddress) => {
          dispatch(createOffer(offer, image, marketAddress));
      }
    }
}

const CreateOffer = connect(mapStateToProps, mapDispatchToProps)(CreateOfferPage);

export default CreateOffer;