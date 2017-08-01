import {connect} from 'react-redux';
import CreateOfferPage from '../../stateless/specific/pages/CreateOfferPage/CreateOfferPage';
import {createOffer} from '../../../redux/actions/OfferAction.js';

const mapStateToProps = (state) => {
    return {
        address: state.market.address,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAdd: (offer, image, marketAddress) => {
            dispatch(createOffer(offer, image, marketAddress, ownProps.history));
        }
    }
};

const CreateOffer = connect(mapStateToProps, mapDispatchToProps)(CreateOfferPage);

export default CreateOffer;