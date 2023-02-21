const passport = require('passport');

const getUserFromJWT = (req, res, next) => {
  if (!req.cookies.token) {
    next();
    return;
  }
  return passport.authenticate('jwt', { session: false })(req, res, next);
};

module.exports = getUserFromJWT;
