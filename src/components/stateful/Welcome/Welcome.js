import { connect } from 'react-redux';
import WelcomePage from "../Pages/WelcomePage/WelcomePage.jsx";
import { gotoMarket } from "../../../redux/actions/MarketAction.js";

const mapStateToProps = (state, ownProps) => {
    return state["market"];
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        goOnClick: (address) => {
            dispatch(gotoMarket(address));
            ownProps.history.push("market");
        }
    }
}

const Welcome = connect(
    mapStateToProps,
    mapDispatchToProps
)(WelcomePage)

export default Welcome;
