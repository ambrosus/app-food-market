import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import NavigationBar from '../../navigation/NavigationBar/NavigationBar';
import Market from '../../../../stateful/Market/Market.js';
import SelectorField from '../../../generic/SelectorField/SelectorField';
import Button from '../../../generic/Button/Button';
import Label from '../../../generic/Label/Label';
import styles from './MarketPage.scss';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    categories: ['All'].concat(state.categories),
    qualities: ['All'].concat(state.market.qualities),
  });

const mapDispatchToProps = (dispatch, ownProps) => ({});

class MarketPage extends Component {

  getCategories() {
    return this.props.categories.map(key => ({ value: key }));
  }

  getQualities() {
    return this.props.qualities.map(name => ({ value: name }));
  }

  render() {
    return (
      <div>
        <NavigationBar title='Market'>
          <Label text='Quality:'/>
          <SelectorField className={styles.selector} options={this.getQualities()}
                         label='Quality' onChange={this.props.qualityChange}
                         value={this.props.filter.quality}/>
          <Label text='Categories:'/>
          <SelectorField className={styles.selector} options={this.getCategories()} label='Category'
                         onChange={this.props.categoryChange}
                         value={this.props.filter.category}/>
          <Link className='navigation__link' to='/create-offer'><Button
            className='navigation__create-offer-button'>
            <span className='icon-basket-loaded button-icon-default'/>Create an offer</Button>
          </Link>
        </NavigationBar>
        <Market/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketPage);

