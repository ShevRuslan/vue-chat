const User = require('../models/user');
const jwtDecode = require('jwt-decode');

module.exports = class {
  //Возвращает данные о пользователе, кроме секретных (токен, пароль и секретный ключ)
  getInfo = async (request, response) => {
    const { headers } = request;

    //TODO: Проверять токен на жизнь
    const decoded = jwtDecode(headers.authorization.replace('Bearer ', ''));
    const { uuid } = decoded;
    const user = await User.findOne({ 'uuid': uuid });
    if (user) {
      response.status(200).json({ user: { login: user.login, img: user.img, status: user.status } });
    } else {
      response.status(500).json({ error: 'Пользователь не найден.' });
    }
  };
  //Возвращается данные по логину
  getUserByLogin = async (request, response) => {
    const { login } = request.params;
    const searchRegexp = new RegExp(login, 'i');
    const user = await User.find({ login: searchRegexp }).select('login img status');
    //TODO: Проверять токен на жизнь
    if (user) {
      response.status(200).json({ user: user });
    } else {
      response.status(500).json({ error: 'Пользователь не найден.' });
    }
  };

  //Сменя информации об текущем пользователе
  changeUserInfo = async (request, response) => {
    const img = request.file;
    const data = request.body;
    const headers = request.headers;
    let newData = {};
    let linkToImage = '';

    //TODO: Проверять токен на жизнь
    const decoded = jwtDecode(headers.authorization.replace('Bearer ', ''));
    const { uuid } = decoded;

    const user = await User.findOne({ 'uuid': uuid });

    Object.keys(data).forEach(key => (data[key] == '' || data[key] == 'null') && delete data[key]); //Фильтрация объекта на пустые поля

    if (user) {
      if (img != undefined) {
        const filename = img.filename;
        linkToImage = 'http://localhost:3001/images/' + filename;

        //TODO: Попробовать все в одном объекте и просто в юзера пихать
        user.img = linkToImage;
        newData.img = linkToImage;
      }

      if (data.login) {
        const searchUser = await User.findOne({ login: data.login });
        if (!searchUser) {
          user.login = data.login;
          newData.login = data.login;
        }
      }

      if (data.status) {
        user.status = data.status;
        newData.status = data.status;
      }

      await user.save();
      response.status(200).json({
        response: newData
      });
    } else {
      response.status(500).json({ error: 'Пользователь не найден.' });
    }
  };
};
