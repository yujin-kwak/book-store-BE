const express = require('express');
const router = express.Router();
const passport = require('passport');
const generateJWT = require('../utils/generateJWT');

router.post('/', passport.authenticate('local', { session: false }), (req, res) => {
  generateJWT(res, req.user);
});

module.exports = router;
