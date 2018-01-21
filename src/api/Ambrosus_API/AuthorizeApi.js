import Base from '../Base.js';

export default class AuthorizeApi extends Base {
  getToken(email) {
    return this.apiClient.post(`accounts/verificationToken`, { email });
  }

  createAccount(email, token) {
    return this.apiClient.post(`accounts`, { email, token });
  }
}
