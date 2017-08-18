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
  };

  static defaultProps = {
    orders: [],
  };

  renderEmpty() {
    return (<p>You didn't buy anything yet</p>);
  }

  renderOrders() {
    return (<ProductContainer products={this.props.orders}/>);
  }

  render() {
    return (
      <div>
        <NavigationBar title='Orders'/>
        {this.props.offers.length > 0 ? this.renderOrders() : this.renderEmpty()}
      </div>
    );
  }
}

export default OrdersPage;
