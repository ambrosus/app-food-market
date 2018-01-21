import queryString from 'query-string';

export default class ApiClient {
  constructor({ prefix }) {
    this.prefix = prefix;
  }

  get(requestUrl, params) {
    return this.request({
      url: requestUrl,
      method: 'GET',
      params,
    });
  }

  post(requestUrl, body = {}, params) {
    return this.request({
      url: requestUrl,
      method: 'POST',
      body,
      params,
    });
  }

  async request({ url, method, params = {}, body }) {
    const urlWithQuery = `${url}${queryString.stringify(params)}`;
    const init = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    if (method === 'POST') init.body = JSON.stringify(body);
    try {
      const response = await fetch(`${this.prefix}/${urlWithQuery}`, init);

      if (response.status >= 400) {
        throw new Error(`Bad response from server. Status code: ${response.status}`);
        return;
      }

      const data = await response.json();

      if (data && data.status === 1) return data;
      throw data.error;
    } catch (err) {
      console.warn('Unhandled exeption', err);
    }
  }
}
