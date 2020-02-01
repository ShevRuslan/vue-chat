const mongoose = require('mongoose');
const User = mongoose.model('user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const { jwtSecret } = require('../config/config.json');

module.exports = class {
  singin = async (req, res) => {
    //Регистрация пользователя
    try {
      const { login, password } = req.body; //Получение значений из формы
      const search = User.findOne({ login: login }).exec(); //Поиск юзера с таким же логином
      if (!search) {
        //Если не был найден, сообщить об этом
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
  signup = async (req, res) => {
    try {
      const { login, password, repeatPassword, secretKey } = req.body;
      check('password').isLength({ min: 5 }); //Начало валидации логина и пароля
      check('login').normalize();
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }//Конец валидации
      const search = User.findOne({ login: login }).exec(); //Поиск юзера с таким же логином
      if (search) {
        //Если найден, сообщить об этом
        res.json(`Пользователь с логином ${login} уже существует. Придумайте новый`);
      }
      if (password !== repeatPassword) {
        res.status(400).json('Пароли не совпадают');
      }
      const passwordHash = jwt(password, jwtSecret);//Хеш параоля
      User.create({ //Создание пароля
        login,
        password: passwordHash,
        secretKey
      });
      res.status(200).json('Готово');
    } catch (err) {
      return err;
    }
  };
};
