const LocalStrategy = require('passport-local').Strategy;
const hashPassword = require('../utils/hashPassword');
const UserService = require('./userService');
const passport = require('passport');

require('dotenv').config();

const env = process.env;

const config = {
  usernameField: 'email',
  passwordField: 'password'
};

const local = new LocalStrategy(config, async (email, password, done) => {
  try {
    console.log('email', email);
    const user = await UserService.getUserById(email);
    if (!user) return done(null, false, { message: 'Incorrect Id' });
    const hashedPassword = hashPassword(password);
    if (hashedPassword !== user.password) return done(null, false, { message: 'Incorrect password' });
    return done(null, { email: user.email, id: user._id, name: user.name });
  } catch (err) {
    return done(err);
  }
});

// const serializeUser = () => {
//   // local strategy 사용
//   passport.use(local);
//   passport.serializeUser((user, callback) => {
//     callback(null, user);
//   });

//   passport.deserializeUser((obj, callback) => {
//     callback(null, obj);
//   });
// };

// module.exports = serializeUser;

const JwtStrategy = require('passport-jwt').Strategy; //jwt strategy

const cookieExtractor = (req) => {
  console.log('cookieExtractor', req);
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['access_token'];
  }
  return token;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: env.jwtSecret
};

// const jwt = new JwtStrategy(opts, async (payload, done) => {
//   try {
//     const user = await UserService.getUserById(payload.email);
//     if (!user) return done(null, false);
//     return done(null, user);
//   } catch (err) {
//     return done(err);
//   }
// }
// );

const jwt = new JwtStrategy(opts, (user, done) => {
  console.log('jwt-user', user);
  return done(null, user);
});

const serializeUser = () => {
  passport.use(local);
  passport.use(jwt);
  passport.serializeUser((user, callback) => {
    console.log('serializeUser', user);
    callback(null, user);
  });

  passport.deserializeUser((obj, callback) => {
    console.log('deserializeUser', obj);
    callback(null, obj);
  });
};

module.exports = serializeUser;
