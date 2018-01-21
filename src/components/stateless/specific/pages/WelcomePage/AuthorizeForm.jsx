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
  isSignInForm: true,
  isToken: false,
  token: '',
  email: '',
  isEmailValid: true
};

export default class AuthorizeForm extends PureComponent {

  static propTypes = {
    getToken: PropTypes.func.isRequired,
    createAccount: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  toggleSignInForm = () => this.setState({ ...INITIAL_STATE, isSignInForm: !this.state.isSignInForm });

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

  onFieldChange = (name, value) => {
    if (!this.state.isEmailValid && name === 'email') {
      const isEmailValid = this.validateField(name, value);
      this.setState({ isEmailValid, [name]: value });
    } else this.setState({ [name]: value });
  };

  validateField = (name, value) => REG_EXPS[name].test(value);

  renderLoginForm = () => {
    return (<div className={styles.container}>
      <Label className={styles.header} text='Login' />
      <Button className={styles.login} onClick={this.props.login}>
        OK
      </Button>
      <span className={styles.signInLink}>
        Dont` have an account? &rarr; <span onClick={this.toggleSignInForm}>Sign in</span>
      </span>
    </div>)
  };

  renderSignInForm = () => {
    const { email, token, isEmailValid, isToken } = this.state;
    return (<div className={styles.container}>
      <Label className={styles.header} text='Sign In' />
        <div className={styles.row}>
          {isToken
            ? <TextField onChange={this.onFieldChange}
                         key='token'
                         placeholder='Token'
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
      <Button className={styles.signIn} onClick={isToken ? this.createAccount : this.getToken}>
        {isToken ? 'Create account' : 'Get token'}
      </Button>
      <span className={styles.loginLink}>
        You have an account? &rarr; <span onClick={this.toggleSignInForm}>Login</span>
      </span>
    </div>)
  };

  render() {
    return (<div className={styles.formWrapper}>
      {this.state.isSignInForm ? this.renderSignInForm() : this.renderLoginForm()}
    </div>);
  }
}
