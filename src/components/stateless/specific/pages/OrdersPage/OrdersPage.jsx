import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MAX_TRADES_AMOUNT } from '../../../../../constants';
import NavigationBar from '../../navigation/NavigationBar/NavigationBar';
import ProductContainer from '../../containers/ProductContainer/ProductContainer';
import PaginationMenu from '../../../generic/PaginationMenu/PaginationMenu';
import styles from './OrdersPage.scss';

class OrdersPage extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    trades: PropTypes.array,
    tradesAmount: PropTypes.number.isRequired,
    marketAddress: PropTypes.string.isRequired,
    fetchTrades: PropTypes.func.isRequired,
    moreDetailsAction: PropTypes.func.isRequired,
    paginationPage: PropTypes.number.isRequired,
    paginationAction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    trades: [],
  };

  componentWillReceiveProps(nextProps) {
    const { marketAddress, paginationPage } = this.props;
    if (!marketAddress && nextProps.marketAddress || paginationPage !== nextProps.paginationPage) {
      this.props.fetchTrades(nextProps.marketAddress);
    }
  }

  componentDidMount() {
    if (this.props.marketAddress)
      this.props.fetchTrades(this.props.marketAddress);
  }

  componentWillUnmount() {
    this.props.paginationAction(0);
  }

  renderEmpty() {
    return (<p>You didn't buy anything yet</p>);
  }

  renderTrades() {
    const { moreDetailsAction, trades, getOptions } = this.props;
    return (<ProductContainer products={trades}
                              moreDetailsPath={'/product-info'}
                              moreDetailsAction={moreDetailsAction}
                              getOptions={getOptions}/>);
  }

  renderPagination() {
    const { tradesAmount, paginationPage, paginationAction } = this.props;
    const pagesAmount = Math.ceil(tradesAmount / MAX_TRADES_AMOUNT);
    return (<PaginationMenu pagesAmount={pagesAmount}
                            paginationPage={paginationPage}
                            paginationAction={paginationAction}/>);
  }

  render() {
    return (
      <div>
        <NavigationBar title='Orders'/>
        <div className={styles.ordersList}>
          {this.props.trades.length > 0 ? this.renderTrades() : this.renderEmpty()}
        </div>
        {this.renderPagination()}
      </div>
    );
  }
}

export default OrdersPage;
