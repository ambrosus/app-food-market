import React from 'react';
import NavigationBar from '../../navigation/NavigationBar/NavigationBar';
import MyOrdersHOC from '../../../../hoc/MyOrdersHOC';

let OrdersPage = () => (
  <div>
    <NavigationBar title='Orders'/>
    <MyOrdersHOC/>
  </div>
);

export default OrdersPage;
