const passport = require('passport');
require('dotenv').config();
const env = process.env;
const jwt = require('jsonwebtoken');

const getUserFromJWT = (req, res, next) => {
  console.log('getUserFromJWT:', req.headers.authorization);

  const userToken = req.headers['authorization'].split(' ')[1];
  console.log('userToken', userToken);
  try {
    const decoded = jwt.verify(userToken, env.jwtSecret);
    console.log('decoded', decoded);
    req.decoded = decoded;
    next();
  } catch (erre) {
    res.status(401).json({
      message: 'Auth failed'
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
