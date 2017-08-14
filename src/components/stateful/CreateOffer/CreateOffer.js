import { connect } from 'react-redux';
import CreateOfferPage from '../../stateless/specific/pages/CreateOfferPage/CreateOfferPage';
import { createOffer } from '../../../redux/actions/OfferAction.js';
import { fetchAttributesFromQualityName } from '../../../redux/actions/AttributesAction';
import { resetSelectedOffer } from '../../../redux/actions/OfferAction';

const mapStateToProps = (state) => ({
  address: state.market.address,
  categories: state.categories,
  qualities: state.market.qualities,
  requirements: state.requirementsAttributes,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onAdd: (offer, image, marketAddress) => {
    dispatch(createOffer(offer, image, marketAddress, ownProps.history));
  },

  fetchAttributes: (requirementsName, marketAddress) => {
    dispatch(fetchAttributesFromQualityName(requirementsName, marketAddress));
  },

  reset: () => {
    dispatch(resetSelectedOffer());
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(CreateOfferPage);
