import React, { PureComponent } from 'react';
import styles from './WelcomePage.scss';
import Link from 'react-router-dom/es/Link';
import PropTypes from 'prop-types';
import MarketForm from './MarketForm';
import AuthorizeForm from './AuthorizeForm';
import FadeTransition from '../../../generic/Transition/FadeTransition';

class WelcomePage extends PureComponent {

  static propTypes = {
    createAccount: PropTypes.func.isRequired,
    getToken: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    goToMarket: PropTypes.func.isRequired,
    createMarket: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: false,
    };
  }

  goToMarket = address => {
    this.props.goToMarket(address);
  };

  login = () => {
    this.setState({ isAuthorized: true });
    this.props.login();
  };

  createAccount = (email, token) => {
    this.setState({ isAuthorized: true });
    this.props.createAccount(email, token);
  };

  render() {
    const { isAuthorized } = this.state;
    const { goToMarket, createAccount, login } = this;
    const { getToken } = this.props;
    return (
      <div className={styles.page}>
        <img className={styles.logo} src="./static/images/ambrosus-animated.gif"/>
        <FadeTransition>
          {isAuthorized
            ? <MarketForm goToMarket={goToMarket} />
            : <AuthorizeForm login={login} getToken={getToken} createAccount={createAccount} />
          }
        </FadeTransition>
        <Link to={isAuthorized ? '/market' : '/' }>
          <img className={styles.smallLogo} src="./static/images/ambrosus-small.png"/>
        </Link>
      </div>);
  }
}

export default WelcomePage;
