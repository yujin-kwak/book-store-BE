const passport = require('passport');
const local = require('./local');
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
