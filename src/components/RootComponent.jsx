import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/stores/store';
import { BrowserHistory } from 'react-history';

import HeaderContainer from './stateless/specific/containers/HeaderContainer/HeaderContainer';
import PageContainer from './stateless/specific/containers/PageContainer/PageContainer';
import ModalContainerHOC from './hoc/ModalContainerHOC';
import CreateMarketContainerHOC from './hoc/CreateMarketContainer';
import ProfileHOC from './hoc/ProfileHOC';
import WelcomeHOC from './hoc/WelcomeHOC.js';
import CreateOfferHOC from './hoc/CreateOfferHOC';
import CreateRequirementsHOC from '../components/hoc/CreateRequirementsHOC';
import CreateStatementsHOC from '../components/hoc/CreateStatementsHOC';
import OrderSummaryHOC from './hoc/OrderSummaryHOC';
import BuyProductHOC from './hoc/BuyProductHOC';
import ApprovedOrderHOC from './hoc/ApprovedOrderHOC';
import FilteredMarketHOC from './hoc/FilteredMarketHOC';
import MyOrdersHOC from './hoc/MyOrdersHOC';
import CreateMeasurementsHOC from './hoc/CreateMeasurementsHOC';
import ProductBatchHOC from './hoc/ProductBatchHOC';
import Web3Component from './stateless/specific/Web3Component';

require('./RootComponent.scss');

export default class RootComponent extends Component {
  render() {
    return (
      <div>
        <Web3Component/>
        <Provider store={store}>
          <Router history={BrowserHistory}>
            <PageContainer>
              <Route component={HeaderContainer}/>
              <Route exact path='/' component={WelcomeHOC}/>
              <Route exact path='/create-market' component={CreateMarketContainerHOC}/>
              <Route exact path='/market' component={FilteredMarketHOC}/>
              <Route exact path='/orders' component={MyOrdersHOC}/>
              <Route exact path='/profile' component={ProfileHOC}/>
              <Route exact path='/product-info' component={OrderSummaryHOC}/>
              <Route exact path='/approved' component={ApprovedOrderHOC}/>
              <Route exact path='/product-buy' component={BuyProductHOC}/>
              <Route exact path='/product-batch' component={ProductBatchHOC}/>
              <Route exact path='/create-offer' component={CreateOfferHOC}/>
              <Route exact path='/create-requirements' component={CreateRequirementsHOC}/>
              <Route exact path='/create-measurements' component={CreateMeasurementsHOC}/>
              <Route exact path='/create-statements' component={CreateStatementsHOC}/>
              <ModalContainerHOC/>
            </PageContainer>
          </Router>
        </Provider>
      </div>);
  }
};
