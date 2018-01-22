import React, { PureComponent } from 'react';
import styles from './WelcomePage.scss';
import Link from 'react-router-dom/es/Link';
import PropTypes from 'prop-types';
import MarketForm from './MarketForm';
import AuthorizeForm from './AuthorizeForm';
import FadeTransition from '../../../generic/Transition/FadeTransition';

class WelcomePage extends PureComponent {

  static propTypes = {
    getToken: PropTypes.func.isRequired,
    createAccount: PropTypes.func.isRequired,
    goToMarket: PropTypes.func.isRequired,
    createMarket: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isMarketModal: false,
      errorText: ''
    };
  }

  goToMarket = address => {
    this.props.goToMarket(address);
  };

  createAccount = async (email, token) => {
    const isUserCreated = await this.props.createAccount(email, token);
    if (isUserCreated) this.setState({ isMarketModal: true });
    else this.setState({ errorText: 'Token is invalid' });
  };

  clearError = () => this.setState({ errorText: '' });

  toggleMarketModal = () => {
    const [ account ] = web3.eth.accounts;
    if (account) this.setState({ errorText: '', isMarketModal: !this.state.isMarketModal });
    else this.setState({ errorText: 'You haven`t got an account, please sign in' });
  };

  render() {
    const { isMarketModal, errorText } = this.state;
    const { goToMarket, toggleMarketModal, createAccount, clearError } = this;
    return (
      <div className={styles.page}>
        <img className={styles.logo} src="./static/images/ambrosus-animated.gif"/>
        <FadeTransition>
          {isMarketModal
            ? <MarketForm goToMarket={goToMarket} toggleMarketModal={toggleMarketModal} />
            : <AuthorizeForm errorText={errorText}
                             clearError={clearError}
                             getToken={this.props.getToken}
                             toggleMarketModal={toggleMarketModal}
                             createAccount={createAccount} />
          }
        </FadeTransition>
        <Link to={isMarketModal ? '/market' : '/' }>
          <img className={styles.smallLogo} src="./static/images/ambrosus-small.png"/>
        </Link>
      </div>);
  }
}

export default WelcomePage;
