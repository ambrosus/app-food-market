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
      selectedQuality: this.props.qualities[0],
    };
  }

  static propTypes = {
    filter: PropTypes.object,
    categories: PropTypes.array,
    qualities: PropTypes.array,
    fetchOffers: PropTypes.func.isRequired,
  };

  static defaultProps = {
    categories: [],
    qualities: [],
  };

  componentDidMount() {
    this.props.fetchOffers(this.props.address, this.props.qualities);
  }

  onChange(label, state) {
    this.setState({
      [label]: state.value,
    });
  }

  getCategories() {
    return this.props.categories.map(key => ({ value: key }));
  }

  getQualities() {
    return this.props.qualities.map(name => ({ value: name }));
  }

  renderEmpty() {
    return (<p>There are no offers on the market yet. <Link to='/create-offer'>Create</Link> first.</p>);
  }

  renderOffers() {
    return (<ProductContainer products={this.props.offers} />);
  }

  render() {
    return (
      <div>
        <NavigationBar title='Market'>
          <Label text='Quality:'/>
          <SelectorField className={styles.selector} options={this.getQualities()}
                         label='selectedQuality' onChange={this.onChange.bind(this)}
                         value={this.state.selectedQuality}/>
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
        {this.props.offers.length > 0 ? this.renderOffers() : this.renderEmpty()}
      </div>
    );
  }
}

export default MarketPage;
