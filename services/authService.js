const LocalStrategy = require('passport-local').Strategy;
const hashPassword = require('../utils/hashPassword');
const UserService = require('./userService');
const passport = require('passport');

const config = {
  usernameField: 'userId',
  passwordField: 'password'
};

const local = new LocalStrategy(config, async (userId, password, done) => {
  try {
    const user = await UserService.getUserById(userId);
    if (!user) return done(null, false, { message: 'Incorrect Id' });
    const hashedPassword = hashPassword(password);
    if (hashedPassword !== user.password) return done(null, false, { message: 'Incorrect password' });
    return done(null, { userId: user.userId, id: user._id, name: user.name });
  } catch (err) {
    return done(err);
  }
});

const serializeUser = () => {
  // local strategy 사용
  passport.use(local);
  passport.serializeUser((user, callback) => {
    callback(null, user);
  });

  passport.deserializeUser((obj, callback) => {
    callback(null, obj);
  });
};

module.exports = serializeUser;

// class AuthService {
//   constructor() {
//     this.config = {
//       usernameField: 'userId',
//       passwordField: 'password'
//     };
//     this.local = this.localStrategy();
//   }

//   static async localStrategy() {
//     const local = new LocalStrategy(this.config, async (userId, password, done) => {
//       try {
//         const user = await UserService.getUserById(userId);
//         if (!user) return done(null, false, { message: 'Incorrect email' });
//         const hashedPassword = hashPassword(password);
//         if (hashedPassword !== user.password) return done(null, false, { message: 'Incorrect password' });
//         return done(null, { userId: user.userId, id: user._id, name: user.name });
//       } catch (err) {
//         return done(err);
//       }
//     });
//   }

//   static async serializeUser() {
//     // local strategy 사용
//     passport.use(this.local);
//     passport.serializeUser((user, callback) => {
//       callback(null, user);
//     });

//     passport.deserializeUser((obj, callback) => {
//       callback(null, obj);
//     });
//   }
// }

// module.exports = AuthService;
