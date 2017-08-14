import { connect } from 'react-redux';
import CreateOfferPage from '../../stateless/specific/pages/CreateOfferPage/CreateOfferPage';
import { createOffer } from '../../../redux/actions/OfferAction.js';
import { fetchAttributesFromQualityName } from '../../../redux/actions/AttributesAction';

const mapStateToProps = (state) => ({
  address: state.market.address,
  categories: state.categories,
  qualities: ['None', ...state.market.qualities],
  attributes: state.attributes,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onAdd: (offer, image, marketAddress) => {
    dispatch(createOffer(offer, image, marketAddress, ownProps.history));
  },

  fetchAttributes: (requirementsName, marketAddress) => {
    dispatch(fetchAttributesFromQualityName(requirementsName, marketAddress));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(CreateOfferPage);
