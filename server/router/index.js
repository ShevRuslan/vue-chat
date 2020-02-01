const express = require('express');
const router  = express.Router();
const auth    = require('../modules/auth');
router.get('/test', (request, response) => {
  response.status(500).json({ message: 'Иди работай!' });
});

router.post('/login', auth.signin);

module.exports = router;
