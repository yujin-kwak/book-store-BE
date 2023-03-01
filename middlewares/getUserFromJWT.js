const passport = require('passport');
require('dotenv').config();
const env = process.env;
const jwt = require('jsonwebtoken');

const getUserFromJWT = (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error('Auth failed: No token provided');

    const userToken = req.headers['authorization'].split(' ')[1];

    const decoded = jwt.verify(userToken, env.jwtSecret);

    req.decoded = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      message: 'Auth failed,No Token Provided',
      error: err
    });
    return;
  }
};

// const getUserFromJWT = (req, res, next) => {
//   console.log('getUserFromJWT:', req.headers.Authorization);
//   // console.log('getUserFromJWT: req.cookies.token', req.config.headers.Authorization);
//   // if (!req.cookies.token) {
//   //   next();
//   //   return;
//   // }

//   if (!req.headers.Authorization) {
//     next();
//     return;
//   }
//   return passport.authenticate('jwt', { session: false })(req, res, next);
// };

module.exports = getUserFromJWT;
