import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Label from '../../../generic/Label/Label';
import TextField from '../../../generic/TextField/TextField';
import Button from '../../../generic/Button/Button';
import styles from './FormStyles.scss';

const REG_EXPS = {
  email: /^([\w\-_+0-9]+(?:\.[\w\-_+]+)*)@((?:[\w\-]+\.)*\w[\w\-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
};

const INITIAL_STATE = {
  isToken: false,
  token: '',
  email: '',
  isEmailValid: true
};

export default class AuthorizeForm extends PureComponent {

  static propTypes = {
    errorText: PropTypes.string.isRequired,
    clearError: PropTypes.func.isRequired,
    getToken: PropTypes.func.isRequired,
    toggleMarketModal: PropTypes.func.isRequired,
    createAccount: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  getToken = () => {
    const { email, isEmailValid } = this.state;
    if (!isEmailValid) return;
    if (this.validateField('email', email)) {
      this.setState({ isToken: true });
      this.props.getToken(email);
    } else this.setState({ isEmailValid: false });
  };

  createAccount = () => {
    const { email,token } = this.state;
    this.props.createAccount(email, token);
  };

  onFieldChange = (name, inputState) => {
    const { errorText, clearError } = this.props;
    if (errorText) clearError();

    if (!this.state.isEmailValid && name === 'email') {
      const isEmailValid = this.validateField(name, inputState.value);
      this.setState({ isEmailValid, [name]: inputState.value });
    } else this.setState({ [name]: inputState.value });
  };

  validateField = (name, value) => REG_EXPS[name].test(value);

  render() {
    const { email, token, isEmailValid, isToken } = this.state;
    return (<div className={styles.formWrapper}>
      <div className={styles.container}>
        <Label className={styles.header} text='Sign In' />
        <div className={styles.row}>
          {isToken
            ? <TextField onChange={this.onFieldChange}
                         key='token'
                         placeholder='Enter your token'
                         label='token'
                         value={token}
                         className={styles.field} />
            : <TextField onChange={this.onFieldChange}
                         key='email'
                         placeholder='Enter your email'
                         label='email'
                         value={email}
                         errors={isEmailValid ? [] : [ 'Email is invalid' ]}
                         className={styles.field} />
          }
        </div>
        <div className={styles.errorField}>{this.props.errorText}</div>
        <Button className={styles.signIn} onClick={isToken ? this.createAccount : this.getToken}>
          {isToken ? 'Create account' : 'Get token'}
        </Button>
        <span className={styles.marketLink}>
          You have an account? &rarr; <span onClick={this.props.toggleMarketModal}>Choose market</span>
        </span>
      </div>
    </div>);
  }
}
