const express = require('express');
const router = express.Router();

router.get('/test', (request, response) => {
  response.status(500).json({ message: 'Иди работай!' });
});

module.exports = router;
