// const LocalStrategy = require('passport-local').Strategy;
// const hashPassword = require('../hashPassword');
// const UserService = require('../../services/userService');

// const config = {
//   usernameField: 'userId',
//   passwordField: 'password'
// };

// const local = new LocalStrategy(config, async (userId, password, done) => {
//   try {
//     const user = await UserService.getUserById(userId);

//     if (!user) return done(null, false, { message: 'Incorrect userId' });
//     const hashedPassword = hashPassword(password);
//     if (hashedPassword !== user.password) return done(null, false, { message: 'Incorrect password' });
//     return done(null, { userId: user.userId, id: user._id, name: user.name });
//   } catch (err) {
//     return done(err);
//   }
// });

// module.exports = local;
