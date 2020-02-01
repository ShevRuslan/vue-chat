const express = require('express');
const router = express.Router();
const auth = require('../modules/auth');
const { check } = require('express-validator');
router.get('/test', (request, response) => {
  response.status(500).json({ message: 'Иди работай!' });
});

router.post(
  '/login',
  [
    check('login')
      .exists()
      .withMessage('Поле login не заполнено'),
    check('password')
      .exists()
      .withMessage('Поле password не заполнено')
      .isLength({ min: 8 })
      .withMessage('Пароль должен быть не меньше 8 символов')
  ],
  auth.signin
);

module.exports = router;
