import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavigationBar from '../../navigation/NavigationBar/NavigationBar';
import SelectorField from '../../../generic/SelectorField/SelectorField';
import Button from '../../../generic/Button/Button';
import Label from '../../../generic/Label/Label';
import styles from './MarketPage.scss';
import ProductContainer from '../../containers/ProductContainer/ProductContainer';

class MarketPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: this.props.categories[0],
      selectedRequirement: this.props.requirements[0],
    };
  }

  static propTypes = {
    filter: PropTypes.object,
    categories: PropTypes.array,
    requirements: PropTypes.array,
    offers: PropTypes.array.isRequired,
    fetchOffers: PropTypes.func.isRequired,
    moreDetailsAction: PropTypes.func.isRequired,
    moreDetailsPath: PropTypes.string.isRequired,
    batchInfoAction: PropTypes.func.isRequired,
    batchInfoPath: PropTypes.func.isRequired,
    getOptions: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.marketAddress && nextProps.marketAddress) {
      this.props.fetchOffers(nextProps.marketAddress);
    }
  }

  componentWillMount() {
    if (this.props.marketAddress) {
      this.props.fetchOffers(this.props.marketAddress);
    }
  }

  onChange(label, state) {
    let newState = Object.assign({}, this.state, {
      [label]: state.value,
    });
    this.setState(newState);
  }

  getCategories() {
    return this.props.categories.map(key => ({ value: key }));
  }

  getRequirements() {
    return this.props.requirements.map(name => ({ value: name }));
  }

  getFilteredCategories(offers) {
    if (this.state.selectedCategory === 'All') {
      return offers;
    } else {
      return offers.filter(offer => offer.category === this.state.selectedCategory);
    }
  }

  getFilteredRequirement(offers) {
    if (this.state.selectedRequirement === 'All') {
      return offers;
    } else {
      return offers.filter(offer => offer.quality === this.state.selectedRequirement);
    }
  }

  renderProductArea() {
    let filteredOffers = this.getFilteredRequirement(this.getFilteredCategories(this.props.offers));
    if (this.props.offers.length === 0)  {
      return (<p>There are no offers on the market yet. {' '}
            <Link to='/create-offer'>Create</Link> the first offer.</p>);
    } else if (filteredOffers.length === 0)  {
      return (<p>There are no offers meeting criteria. Change filter criteria to see offers.</p>);
    } else {
      return (<ProductContainer moreDetailsPath={this.props.moreDetailsPath}
                            moreDetailsAction={this.props.moreDetailsAction}
                            batchInfoAction={this.props.batchInfoAction}
                            batchInfoPath={this.props.batchInfoPath}
                            products={filteredOffers}
                            getOptions={this.props.getOptions}/>);
    }
  }

  render() {
    return (
      <div>
        <NavigationBar title='Market'>
          <Label text='Quality:'/>
          <SelectorField className={styles.selector} options={this.getRequirements()}
                         label='selectedRequirement'
                         placeholder="Select quality"
                         onChange={this.onChange.bind(this)}
                         value={this.state.selectedRequirement}/>
          <Label text='Categories:'/>
          <SelectorField className={styles.selector} options={this.getCategories()}
                         label='selectedCategory'
                         onChange={this.onChange.bind(this)}
                         placeholder="Select category"
                         value={this.state.selectedCategory}/>
          <Link className='navigation__link' to='/create-offer'><Button
            className='navigation__create-offer-button'>
            <span className='icon-basket-loaded button-icon-default'/>Create an offer</Button>
          </Link>
        </NavigationBar>
        { this.renderProductArea() }
      </div>
    );
  }
}

export default MarketPage;
