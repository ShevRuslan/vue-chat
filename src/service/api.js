import axios from 'axios';
import expiredToken from '../../utils/expiredToken';
import VueJwtDecode from 'vue-jwt-decode';
export default class Api {
  getResource = async (url, data, method, headers = {}) => {
    const response = await axios({
      method: method,
      url: `api/${url}`,
      data: data,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });

    return response.data;
  };

  loginUser = async data => {
    const res = await this.getResource('login', data, 'POST');
    return res;
  };

  registerUser = async data => {
    const res = await this.getResource('register', data, 'POST');
    return res;
  };

  refrestToken = async data => {
    const res = await this.getResource('token', data, 'POST');
    return res;
  };

  getInfoUser = async () => {
    const token = localStorage.getItem('token');
    const { exp } = VueJwtDecode.decode(token);
    if (expiredToken(exp)) {
      const res = await this.getResource('user', null, 'GET', { 'Authorization': `Bearer ${token}` });
      return res;
    } else {
      const oldRefreshToken = localStorage.getItem('refreshToken');
      const data = { 'refreshToken': oldRefreshToken };
      const { token, refreshToken } = await this.refrestToken(data);

      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

      const res = await this.getResource('user', null, 'GET', { 'Authorization': `Bearer ${token}` });
      return res;
    }
  };
}
