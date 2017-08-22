import React, { Component } from 'react';
import NavigationBar from '../../navigation/NavigationBar/NavigationBar';
import Button from '../../../generic/Button/Button';
import { Link } from 'react-router-dom';
import styles from './CreatingMarketPage';

class CreatingMarketPage extends Component {

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return (
      <div>
        <NavigationBar title={this.props.market.status}>
          {this.props.market.address ? (
            <Link className={styles.link} to='market'>
              <Button>
                <span>Go to market</span>
              </Button>
            </Link>
          ) : ''}
        </NavigationBar>
      </div>
    );
  }
}

export default CreatingMarketPage;
