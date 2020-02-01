const mongoose = require('mongoose');
const User = mongoose.model('user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config.json');

const singin = async (req, res) => {
  //регистрация пользователя
  try {
    const { login, password } = req.body; //получение значений из формы
    const search = User.findOne({ login: login }).exec(); //поиск юзера с таким же логином
    if (search) {
      //если найден, сообщить об этом
      res.json(`Пользователь с логином ${login} не найден`);
    }
    const valid = bcryptjs.compareSync(password, User.password);
    if (valid) {
      const token = jwt.sign(User._id.toString(), jwtSecret);
      res.json({ token });
    } else {
      res.status(400).json('ошибка в валидации');
    }
  } catch (err) {
    return err;
  }
};

module.exports = {
  singin
};
