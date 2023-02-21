const express = require('express');
const router = express.Router();
const passport = require('passport');
const generateJWT = require('../utils/generateJWT');

{
  // this is the route for session way   session() should be inactive
  // router.post('/', passport.authenticate('local'), (req, res) => {
  //   console.log('authRoute.js: req.user', req);
  //   res.status(200).json(req.user);
  // });
}

// this is the route for jwt way    session() should be inactive
router.post('/', passport.authenticate('local', { session: false }), (req, res) => {
  generateJWT(res, req.user);
  res.status(200).json(req.user);
});

module.exports = router;
