import Base from '../Base.js';

export default class StatementsApi extends Base {
  list(tradeId, signature) {
    return this.apiClient.get(`statements/${tradeId}/${signature}`);
  }

  create(body) {
    return this.apiClient.post('statement', body);
  }
}
