const express = require('express');

const router = express.Router();

router.post('/token', (req, res) => {
  if (req.body.token) {
    res.cookie('token', req.body.token, { signed: true, httpOnly: false, maxAge: 999999999999 });
  } else {
    res.cookie('token', '', { signed: false });
  }
  res.send('');
});

module.exports = router;
