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
      createdSecret: '',
      errorText: ''
    };
  }

  confirmAccountCreation = () => {
    if (web3.eth.accounts[0]) this.setState({ isMarketModal: true, errorText: '' });
    else this.setState({ errorText: 'You haven\'t import your account' });
  };

  goToMarket = address => {
    this.props.goToMarket(address);
  };

  createAccount = async (email, token) => {
    const response = await this.props.createAccount(email, token);
    if (response) this.setState({ createdSecret: response.secret });
    else this.setState({ errorText: 'Token is invalid' });
  };

  clearError = () => this.setState({ errorText: '' });

  toggleMarketModal = () => {
    const [ account ] = web3.eth.accounts;
    if (account) this.setState({ errorText: '', isMarketModal: !this.state.isMarketModal });
    else this.setState({ errorText: 'You haven`t got an account, please sign in' });
  };

  render() {
    const { isMarketModal, createdSecret, errorText } = this.state;
    const { goToMarket, toggleMarketModal, createAccount, clearError } = this;
    return (
      <div className={styles.page}>
        <img className={styles.logo} src="./static/images/ambrosus-animated.gif"/>
        <FadeTransition>
          {isMarketModal
            ? <MarketForm goToMarket={goToMarket}
                          toggleMarketModal={toggleMarketModal}
                          createMarket={this.props.createMarket}/>
            : <AuthorizeForm errorText={errorText}
                             clearError={clearError}
                             getToken={this.props.getToken}
                             confirmAccountCreation={this.confirmAccountCreation}
                             toggleMarketModal={toggleMarketModal}
                             createdSecret={createdSecret}
                             createAccount={createAccount}/>
          }
        </FadeTransition>
        <Link to={isMarketModal ? '/market' : '/' } className={styles.smallLogoLink}>
          <img className={styles.smallLogo} src="./static/images/ambrosus-small.png"/>
        </Link>
      </div>);
  }
}

export default WelcomePage;
