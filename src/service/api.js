import axios from 'axios';
import expiredToken from '../../utils/expiredToken';
import VueJwtDecode from 'vue-jwt-decode';
//TODO: Переделать под синглтон
export default class Api {
  /**
   * Функция, выполняющая запрос к серверу
   * Параметры:
   * url - путь
   * method - метод (GET | POST | PUT | DELETE)
   * headers - заголовки
   */
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
  /**
   * Проверка на валидность токена (жизнь токена)
   * Если токен валидный (не истек) - возращается true
   * Если токен не валидный (истек) - делается запрос на новый токен и вовзращается он
   **/
  validateToken = async () => {
    const currentToken = localStorage.getItem('token');
    const { exp } = VueJwtDecode.decode(currentToken);
    if (!expiredToken(exp)) {
      const oldRefreshToken = localStorage.getItem('refreshToken');
      const { token, refreshToken } = await this.refreshToken({ 'refreshToken': oldRefreshToken });
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      return token;
    }
    return currentToken;
  };
  //Запрос на авторизацию
  loginUser = async data => {
    const res = await this.getResource('login', data, 'POST');
    return res;
  };
  // Запрос на регистрацию
  registerUser = async data => {
    const res = await this.getResource('register', data, 'POST');
    return res;
  };
  // Запрос на сброс токена
  refreshToken = async data => {
    const res = await this.getResource('token', data, 'POST');
    return res;
  };
  // Запрос на получение информации об авторизированном человеке
  getInfoUser = async () => {
    const validToken = await this.validateToken();
    const res = await this.getResource('user', null, 'GET', { 'Authorization': `Bearer ${validToken}` });
    return res;
  };
  // Запрос на поиск людей по логину
  searchUser = async data => {
    const validToken = await this.validateToken();
    const res = await this.getResource(`user/${data}`, null, 'GET', { 'Authorization': `Bearer ${validToken}` });
    return res;
  };
  changeInfo = async data => {
    const validToken = await this.validateToken();
    const res = await this.getResource('/user/changeInfo', data, 'POST', {
      'Authorization': `Bearer ${validToken}`,
    });
    return res;
  };
}
