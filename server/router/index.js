const express = require('express');
const router = express.Router();
const auth = require('../modules/auth');
const { check, validationResult } = require('express-validator');
const { body } = require('express-validator');
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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  },
  body('passwordConfirmation').custom((repeatPassword, { req }) => {
    if (repeatPassword !== req.body.password) {
      throw new Error('Пароли не совпадают. Заполните пароли занова и повторите попытку регистрации');
    }
  }),
  auth.signin
);

module.exports = router;
