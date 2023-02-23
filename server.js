const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8080;
const dbconnect = require('./models/index');
const userRouter = require('./routes/userRoute');
const bookRouter = require('./routes/bookRoute');
const orderRouter = require('./routes/orderRoute');
const testRouter = require('./routes/testRouter');
// const serializeUser = require('./utils/passport/index'); // this is for session way
const serializeUser = require('./services/authService');
const authRouter = require('./routes/authRoute');
const mongoStore = require('connect-mongo');
// (node:10080) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead. <---- this is the warning should be checked!!!
const getUserFromJWT = require('./middlewares/getUserFromJWT');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const pageRouter = require('./routes/pageRoute');
const { SecurityHub } = require('aws-sdk');
require('dotenv').config();

const connect = process.env;
const url = `mongodb://${connect.username}:${connect.password}@${connect.url}/${connect.dbname}?authSource=${connect.authSource}`;

serializeUser();
dbconnect();
// app.use(cors({ origin: '*', credentials: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
{
  // This is inactive because it is not used in the current version which is setted up with passport-JWT
  // app.use(
  //   session({
  //     secret: 'secret',
  //     resave: false,
  //     saveUninitialized: true,
  //     cookie: {
  //       maxAge: 1000 * 60 * 60
  //     },
  //     store: mongoStore.create({ mongoUrl: url })
  //   })
  // );
}

app.use(passport.initialize());
{
  // This is inactive because it is not used in the current version which is setted up with passport-JWT
  // app.use(passport.session());
}
// app.setHeader('Access-Control-Allow-Credentials', 'true');
// app.use(flash());

// app.use((req, res, next) => {
//   res.append('Access-Control-Allow-Origin', ['*']);
//   res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.append('Access-Control-Allow-Headers', 'Content-Type');
//   res.append('Access-Control-Allow-Credentials', 'true');
//   next();
// });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Set-Cookie', 'jwt=jwt_value;Path=/;Domain=domainvalue;Max-Age=seconds;HttpOnly');
  next();
});
app.use(getUserFromJWT);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/book', bookRouter);
app.use('/order', orderRouter);
app.use('/test', testRouter);

app.use('/page', pageRouter);

app.use(async (err, req, res, next) => {
  console.log(err.message);
  res.status(200).json({ Error: err.message });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('*', (req, res) => {
  res.status(400).send('hello!this is not a valid route');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
