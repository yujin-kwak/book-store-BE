const jwt = require('jsonwebtoken');
require('dotenv').config();

const env = process.env;

const secret = env.jwtSecret;

const generateJWT = (res, user) => {
  // put user info into token
  const token = jwt.sign(user, secret, { expiresIn: '1h' });
  // send token to client
  // res.authHeader = token;
  // res.cookie('token', token, { httpOnly: false, maxAge: 3600000 });
  res.send(token);
  // res.config.data = token;
  // res.cookie('token', token);
};

// const authenticateJWT = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (authHeader) {
//     const token = authHeader.split(' ')[1];

//     jwt.verify(token, secret, (err, user) => {
//       if (err) {
//         return res.sendStatus(403);
//       }

//       req.user = user;
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };

module.exports = generateJWT;

// const authenticateJWT = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (authHeader) {
//     const token = authHeader.split(' ')[1];

//     jwt.verify(token, secret, (err, user) => {
//       if (err) {
//         return res.sendStatus(403);
//       }

//       req.user = user;
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// }
