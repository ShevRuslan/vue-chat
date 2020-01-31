const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);

/* Модель для пользователей
Обязательные поля:
login - уникальный логин
passoword - пароль
secretKey - секретный ключ, для восстановления пароль
*/
const user = new Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxLenght: 30
    },
    secretKey: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 20
    },
    _id: Number
  },
  { _id: false, versionKey: false }
);

user.plugin(AutoIncrement);

module.exports = model('User', user);
