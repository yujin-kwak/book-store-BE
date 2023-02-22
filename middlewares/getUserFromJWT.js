const passport = require('passport');

const getUserFromJWT = (req, res, next) => {
  console.log('getUserFromJWT: req.cookies.token', req.cookies.token);
  if (!req.cookies.token) {
    next();
    return;
  }
  return passport.authenticate('jwt', { session: false })(req, res, next);
};

module.exports = getUserFromJWT;
