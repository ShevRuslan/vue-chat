import axios from 'axios';

export default class Api {
  getResource = async (url, data, method) => {
    const response = await axios({
      method: method,
      url: url,
      data: data,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${response.status}`);
    }

    return await response;
  };

  loginUser = async data => {
    const res = await this.getResource('/login', data, 'POST');
    return res;
  };

  registerUser = async data => {
    const res = await this.getResource('/register', data, 'POST');
    return res;
  };
}
