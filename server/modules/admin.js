const User = require('../models/user');
const decode = require('jwt-decode');
const { headers } = Request;

module.exports = class {
  panel = (req, res) => {
    const type = decode(headers.authorization.replace('type', ''));
    if (type != 'type') {
      res.status(404).json('page not found');
    } else {
      res.status(200);
    }
  };
};
