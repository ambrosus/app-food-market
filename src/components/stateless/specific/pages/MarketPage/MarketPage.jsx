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
  };

  componentWillMount() {
    this.props.fetchOffers(this.props.address, this.props.requirements);
  }

  onChange(label, state) {
    let newState = Object.assign({}, this.state, {
      [label]: state.value,
    });
    this.setState(newState, this.props.onFilterChange.bind(this, newState));
  }

  getCategories() {
    return this.props.categories.map(key => ({ value: key }));
  }

  getRequirements() {
    return this.props.requirements.map(name => ({ value: name }));
  }

  getFilteredOffers() {
    if (this.state.selectedCategory === 'All') {
      return this.props.offers;
    } else {
      return this.props.offers.filter(offer => offer.category === this.state.selectedCategory);
    }
  }

  render() {
    return (
      <div>
        <NavigationBar title='Market'>
          <Label text='Quality:'/>
          <SelectorField className={styles.selector} options={this.getRequirements()}
                         label='selectedRequirement' onChange={this.onChange.bind(this)}
                         value={this.state.selectedRequirement}/>
          <Label text='Categories:'/>
          <SelectorField className={styles.selector} options={this.getCategories()}
                         label='selectedCategory'
                         onChange={this.onChange.bind(this)}
                         value={this.state.selectedCategory}/>
          <Link className='navigation__link' to='/create-offer'><Button
            className='navigation__create-offer-button'>
            <span className='icon-basket-loaded button-icon-default'/>Create an offer</Button>
          </Link>
        </NavigationBar>
        { this.getFilteredOffers().length > 0 ?
          <ProductContainer moreDetailsPath={this.props.moreDetailsPath}
                            moreDetailsAction={this.props.moreDetailsAction}
                            products={this.props.offers} /> :
          (<p>There are no offers on the market yet. <Link to='/create-offer'>Create</Link> first.</p>) }
      </div>
    );
  }
}

export default MarketPage;
