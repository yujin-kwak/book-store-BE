const jwt = require('jsonwebtoken');
require('dotenv').config();

const env = process.env;

const secret = env.jwtSecret;

const generateJWT = (res, user) => {
  // put user info into token
  const token = jwt.sign(user, secret, { expiresIn: '1h' });
  // send token to client
  res.cookie('token', token);
};

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
