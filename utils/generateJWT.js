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
};

module.exports = generateJWT;
