import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../../navigation/NavigationBar/NavigationBar';
import ProductContainer from '../../containers/ProductContainer/ProductContainer';

class OrdersPage extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    orders: PropTypes.array,
    marketAddress: PropTypes.string.isRequired,
    fetchOrders: PropTypes.func.isRequired,
    moreDetailsAction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    orders: [],
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.marketAddress && nextProps.marketAddress) {
      this.props.fetchOrders(nextProps.marketAddress);
    }
  }

  componentDidMount() {
    if (this.props.marketAddress)
      this.props.fetchOrders(this.props.marketAddress);
  }

  renderEmpty() {
    return (<p>You didn't buy anything yet</p>);
  }

  renderOrders() {
    return (<ProductContainer products={this.props.orders}
    moreDetailsPath={'/product-info'}
    moreDetailsAction={this.props.moreDetailsAction}/>);
  }

  render() {
    return (
      <div>
        <NavigationBar title='Orders'/>
        {this.props.orders.length > 0 ? this.renderOrders() : this.renderEmpty()}
      </div>
    );
  }
}

export default OrdersPage;
