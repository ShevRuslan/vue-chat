const express = require('express');
const router = express.Router();
const passport = require('passport');
const authClass = require('../modules/auth');
const userClass = require('../modules/user');
const { login, register, refreshToken } = new authClass();
const { getInfo, getUserByLogin, changeUserInfo } = new userClass();
const { check } = require('express-validator');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'server/public/images');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

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
    check('email')
      .exists()
      .withMessage('Вы не ввели почту!')
      .isEmail().withMessage('Почта введена некорректно!')
  ],
  register
);

router.post(
  '/login',
  [
    check('login')
      .exists()
      .withMessage('Введите логин!')
      .isLength({ min: 8 })
      .withMessage('Логин должен быть не меньше 8 символов!'),
    check('password')
      .exists()
      .withMessage('Введите пароль!')
      .isLength({ min: 8 })
      .withMessage('Пароль должен быть не меньше 8 символов!')
  ],
  login
);

router.post('/token', refreshToken);

router.get('/user', passport.authenticate('jwt', { session: false }), getInfo);
router.get('/user/:login', passport.authenticate('jwt', { session: false }), getUserByLogin);
router.post('/user/changeInfo', upload.single('img'),  changeUserInfo);
module.exports = router;
