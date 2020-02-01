const express = require('express');
const router = express.Router();
const authClass = require('../modules/auth');
const { login, register, refreshToken } = new authClass();
const { check } = require('express-validator');

router.post(
  '/register',
  [
    check('login')
      .exists().withMessage('Поле login не заполнено'),
    check('password')
      .exists().withMessage('Поле password не заполнено')
      .isLength({ min: 8 }).withMessage('Пароль должен быть не меньше 8 символов'),
    check('secretKey')
      .exists().withMessage('Поле "Секретный ключ" не заполнено')
  ],
  register
);

router.post('/login', [
  check('login')
    .exists().withMessage('Поле login не заполнено'),
  check('password')
    .exists().withMessage('Поле password не заполнено'),
  login
]);

router.post('/token', refreshToken)

module.exports = router;
