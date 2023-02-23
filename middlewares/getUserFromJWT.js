const passport = require('passport');

const getUserFromJWT = (req, res, next) => {
  console.log('getUserFromJWT:', req.headers.Authorization);
  // console.log('getUserFromJWT: req.cookies.token', req.config.headers.Authorization);
  // if (!req.cookies.token) {
  //   next();
  //   return;
  // }

  if (!req.headers.Authorization) {
    next();
    return;
  }
  return passport.authenticate('jwt', { session: false })(req, res, next);
};

module.exports = getUserFromJWT;
