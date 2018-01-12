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
    orders: PropTypes.array,
    ordersAmount: PropTypes.number.isRequired,
    marketAddress: PropTypes.string.isRequired,
    fetchOrders: PropTypes.func.isRequired,
    moreDetailsAction: PropTypes.func.isRequired,
    paginationPage: PropTypes.number.isRequired,
    paginationAction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    orders: [],
  };

  componentWillReceiveProps(nextProps) {
    const { marketAddress, paginationPage } = this.props;
    if (!marketAddress && nextProps.marketAddress || paginationPage !== nextProps.paginationPage) {
      this.props.fetchOrders(nextProps.marketAddress);
    }
  }

  componentDidMount() {
    if (this.props.marketAddress)
      this.props.fetchOrders(this.props.marketAddress);
  }

  componentWillUnmount() {
    this.props.paginationAction(0);
  }

  renderEmpty() {
    return (<p>You didn't buy anything yet</p>);
  }

  renderOrders() {
    const { moreDetailsAction, orders, getOptions } = this.props;
    return (<ProductContainer products={orders}
                              moreDetailsPath={'/product-info'}
                              moreDetailsAction={moreDetailsAction}
                              getOptions={getOptions}/>);
  }

  renderPagination() {
    const { ordersAmount, paginationPage, paginationAction } = this.props;
    const pagesAmount = Math.ceil(ordersAmount / MAX_TRADES_AMOUNT);
    return (<PaginationMenu pagesAmount={pagesAmount}
                            paginationPage={paginationPage}
                            paginationAction={paginationAction}/>);
  }

  render() {
    return (
      <div>
        <NavigationBar title='Orders'/>
        <div className={styles.ordersList}>
          {this.props.orders.length > 0 ? this.renderOrders() : this.renderEmpty()}
        </div>
        {this.renderPagination()}
      </div>
    );
  }
}

export default OrdersPage;
