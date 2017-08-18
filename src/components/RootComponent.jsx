import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { Component } from 'react';
import HeaderContainer from './stateless/specific/containers/HeaderContainer/HeaderContainer';
import PageContainer from './stateless/specific/containers/PageContainer/PageContainer';
import FilteredMarketPageHOC from './hoc/FilteredMarketPageHOC';
import WelcomeHOC from './hoc/WelcomeHOC.js';
import CreatingMarketContainer from './stateless/specific/pages/CreatingMarketPage/CreatingMarketContainer.js';
import OrdersPage from './stateless/specific/pages/OrdersPage/OrdersPage';
import ProfilePage from './stateless/specific/pages/ProfilePage/ProfilePage';
import CreateOffer from './hoc/CreateOfferHOC.js';
import { Provider } from 'react-redux';
import store from '../redux/stores/store';
import ModalContainer from './stateless/specific/containers/ModalContainer/ModalContainer';
import { BrowserHistory } from 'react-history';
import CreateRequirementsHOC from '../components/hoc/CreateRequirementsHOC';
import OrderSummaryHOC from './hoc/ProductHOC/OrderSummaryHOC';
import BuyProductHOC from './hoc/ProductHOC/BuyProductHOC';
import ApprovedOrderHOC from './hoc/ProductHOC/ApprovedOrderHOC';

require('./RootComponent.scss');

export default class RootComponent extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={BrowserHistory}>
            <PageContainer>
              <HeaderContainer/>
              <Route exact path='/' component={WelcomeHOC}/>
              <Route exact path='/create-market' component={CreatingMarketContainer}/>
              <Route exact path='/market' component={FilteredMarketPageHOC}/>
              <Route exact path='/orders' component={OrdersPage}/>
              <Route exact path='/profile' component={ProfilePage}/>
              <Route exact path='/product' component={OrderSummaryHOC}/>
              <Route exact path='/product-info' component={OrderSummaryHOC}/>
              <Route exact path='/approved' component={ApprovedOrderHOC}/>
              <Route exact path='/product-buy' component={BuyProductHOC}/>
              <Route exact path='/create-offer' component={CreateOffer}/>
              <Route exact path='/create-requirements' component={CreateRequirementsHOC}/>
              <ModalContainer/>
            </PageContainer>
        </Router>
      </Provider>);
  }
};
