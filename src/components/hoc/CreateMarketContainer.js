import { connect } from 'react-redux';
import CreatingMarketPage from '../stateless/specific/pages/CreatingMarketPage/CreatingMarketPage';
import { createMarket } from '../../redux/actions/MarketAction.js';

const mapStateToProps = state => ({ market: state.market });

const mapDispatchToProps = (dispatch, ownProps) => ({
    onMount: () => {
      dispatch(createMarket(ownProps.history));
    },
  });

const CreateMarketContainerHOC = connect(mapStateToProps, mapDispatchToProps)(CreatingMarketPage);

export default CreateMarketContainerHOC;
