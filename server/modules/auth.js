const mongoose = require('mongoose');
const User = mongoose.model('user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config.json');
const { ValidationResult } = require('express-validator');

module.exports = class {
  signIn = async (req, res) => {
    //Регистрация пользователя
    try {
      const erros = ValidationResult(req).mapped();
      if (erros) {
        return res.status(200).json({ erros: erros });
      }
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
  signUp = async (req, res) => {
    try {
      const erros = ValidationResult(req).mapped();
      if (erros) {
        return res.status(200).json({ erros: erros });
      }
      const { login, password, secretKey } = req.body;
      const search = User.findOne({ login: login }).exec(); //Поиск юзера с таким же логином
      if (search) {
        //Если найден, сообщить об этом
        res.json(`Пользователь с логином ${login} уже существует. Придумайте новый`);
      }
      const passwordHash = jwt(password, jwtSecret); //Хеш параоля
      User.create({
        //Создание пароля
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
