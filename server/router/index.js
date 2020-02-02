const express = require('express');
const router = express.Router();
const authClass = require('../modules/auth');
const { login, register, refreshToken } = new authClass();
const { check } = require('express-validator');

router.post(
  '/register',
  [
    check('login')
      .exists()
      .withMessage('Вы не ввели логин!'),
    check('password')
      .exists()
      .withMessage('Вы не ввели пароль!')
      .isLength({ min: 8 })
      .withMessage('Пароль должен быть не меньше 8 символов!'),
    check('secretKey')
      .exists()
      .withMessage('Вы не ввели секретный ключ!')
      .isLength({ min: 8 })
      .withMessage('Секретный ключ должен быть не меньше 8 символов'),
  ],
  register
);

router.post(
  '/login',
  [
    check('login')
      .exists()
      .withMessage('Введите почту!'),
    check('password')
      .exists()
      .withMessage('Введите пароль!')
      .isLength({ min: 8 })
      .withMessage('Пароль должен быть не меньше 8 символов!')
  ],
  login
);

router.post('/token', refreshToken);

module.exports = router;
