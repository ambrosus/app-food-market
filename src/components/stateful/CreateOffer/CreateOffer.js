import {connect} from 'react-redux';
import CreateOfferPage from '../../stateless/specific/pages/CreateOfferPage/CreateOfferPage';
import {createOffer} from '../../../redux/actions/OfferAction.js';

const mapStateToProps = (state) => {
    return {
        address: state.market.address,
        categories: state.categories,
        qualities: state.market.qualities
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAdd: (offer, image, marketAddress) => {
            dispatch(createOffer(offer, image, marketAddress, ownProps.history));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateOfferPage);