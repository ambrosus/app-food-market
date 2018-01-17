import ApiClient       from './apiClient';
import StatementsAPI   from './StatementsApi';

export default function ({ apiPrefix }) {
  if (!apiPrefix) {
    throw new Error('[apiPrefix] required');
  }

  const api = new ApiClient({ prefix: apiPrefix });
  return {
    apiClient: api,
    statements: new StatementsAPI({ apiClient: api }),
  };
}
