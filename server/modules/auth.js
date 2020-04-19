const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const config = require('../config/config.json');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const uuid = require('uuid');
const { validationResult } = require('express-validator');

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret
};
const strategy = new JWTStrategy(jwtOptions, (payload, next) => {
  User.findOne({ uuid: payload.uuid }, (err, user) => {
    if (err) return next(err);
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
});
passport.use(strategy);

module.exports = class {
  //Авторизация пользователя
  login = async (request, response) => {
    const errors = validationResult(request).mapped();

    if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
      return response.status(400).json({ errors: errors });
    }

    const { login, password } = request.body;

    try {
      const user = await User.findOne({ login });

      if (!user) {
        response.status(404).json({ errors: { login: { msg: 'Пользователь не найден.' } } });
      }

      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ uuid: user.uuid, type: user.type }, config.secret, { expiresIn: config.tokenLife });
        const refreshToken = jwt.sign({ uuid: user.uuid, type: user.type }, config.refreshTokenSecret, {
          expiresIn: config.refreshTokenLife
        });
        user.refresh_token = refreshToken;
        await user.save();
        const res = {
          'type': user.type,
          'status': 'Logged in',
          'success': true,
          'token': token,
          'refreshToken': refreshToken
        };

        response.status(200).json(res);
      }
    } catch (err) {
      response.status(401).json({ errors: { msg: `Ошибка с базой данных. ${err}` } });
    }
  };
  //Регистрация пользователя
  register = async (request, response) => {
    const errors = validationResult(request).mapped();

    if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
      return response.status(400).json({ errors: errors });
    }

    const { login, password, secretKey, email } = request.body;

    
    const user = await User.findOne({ login });
    const userUnicId = uuid.v4();
    if (user) {
      response.status(400).json({ errors: { register: { msg: 'Пользователь существует.' } } });
    }

    const token = jwt.sign({ uuid: userUnicId, type: 'user' }, config.secret, { expiresIn: config.tokenLife });
    const refreshToken = jwt.sign({ uuid: userUnicId, type: 'user' }, config.refreshTokenSecret, {
      expiresIn: config.refreshTokenLife
    });

    let newUser = new User({
      login: login,
      email: email,
      secretKey: secretKey,
      password: bcrypt.hashSync(password, salt),
      uuid: userUnicId,
      refresh_token: refreshToken,
      type: 'user'
    });
    try {
      const saveUser = await newUser.save();
      if (saveUser) {
        response.status(201).json({
          msg: 'Регистрация прошла успешно!',
          success: true,
          token: token,
          refreshToken: refreshToken
        });
      }
    } catch (err) {
      response.status(500).json({ errors: { register: { msg: 'Регистрация провалилась.' } } });
    }
  };
  refreshToken = async (request, response) => {
    const { refreshToken } = request.body;
    try {
      const decoded = jwt.verify(refreshToken, config.secret);
      const timeLifeRefToken = decoded.exp;
      const currentTime = new Date().getTime() / 1000;
      if (currentTime > timeLifeRefToken) {
        response.status(401).json({ 'Error': 'TOKEN_EXPIRED' });
      } else {
        const user = await User.findOne({ refresh_token: refreshToken });
        if (user) {
          const token = jwt.sign({ uuid: user.uuid }, config.secret, { expiresIn: config.tokenLife });
          const refreshToken = jwt.sign({ uuid: user.uuid }, config.refreshTokenSecret, {
            expiresIn: config.refreshTokenLife
          });
          const res = {
            'token': token,
            'refreshToken': refreshToken
          };
          user.refresh_token = refreshToken;
          await user.save();
          response.status(200).json(res);
        }
        response.status(404).send('Пользователь не найден');
      }
    } catch (err) {
      response.status(401).json({ message: `${err}` });
    }
  };
};
