const crypto = require('crypto');
const iv = crypto.randomBytes(16); //генерация вектора инициализации
const key = crypto.scryptSync('secret', 'salt', 32); //генерация ключа

module.exports = class {
  encrypt = Newmes => {
    const hash = crypto
      .createCipheriv('aes-256-cbc', key, iv)
      .update(Newmes, 'utf8', 'hex')
      .final('hex');

    console.log(hash);
  };

  decryption = Hash => {
    const hash = crypto
      .createDecipheriv('aes-256-cbc', key, iv)
      .update(Hash, 'hex', 'utf8')
      .final('utf8');
    console.log(hash);
  };
};
