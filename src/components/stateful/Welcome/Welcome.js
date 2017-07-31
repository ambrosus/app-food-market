import { connect } from 'react-redux';
import WelcomePage from "../../stateless/specific/Pages/WelcomePage/WelcomePage";
import { gotoMarket } from "../../../redux/actions/MarketAction.js";
import * as Cookies from "js-cookie";

const mapStateToProps = (state, ownProps) => {
    return state["market"];
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        goOnClick: (address) => {
            Cookies.set('market_address', address);
            dispatch(gotoMarket(address));
            ownProps.history.push("market");
        }
    }
};

const Welcome = connect(
    mapStateToProps,
    mapDispatchToProps
)(WelcomePage);

export default Welcome;
