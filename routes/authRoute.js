const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/', passport.authenticate('local'), (req, res) => {
  console.log(req);
  res.status(200).json(req.user);
});

module.exports = router;
