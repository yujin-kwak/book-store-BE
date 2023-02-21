const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8080;
const dbconnect = require('./models/index');
const userRouter = require('./routes/userRoute');
const bookRouter = require('./routes/bookRoute');
const orderRouter = require('./routes/orderRoute');
const testRouter = require('./routes/testRouter');
const serializeUser = require('./utils/passport/index');
const authRouter = require('./routes/authRoute');
const mongoStore = require('connect-mongo'); // (node:10080) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
require('dotenv').config();
const connect = process.env;
console.log('connect', connect);
const url = `mongodb://${connect.username}:${connect.password}@${connect.url}/${connect.dbname}?authSource=admin`;

serializeUser();
dbconnect();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60
    },
    store: mongoStore.create({ mongoUrl: url })
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(flash());

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/book', bookRouter);
app.use('/order', orderRouter);
app.use('/test', testRouter);

app.use(async (err, req, res, next) => {
  console.log(err.message);
  res.status(200).json({ Error: err.message });
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('*', (req, res) => {
  res.status(400).send("Sorry can't find ddthat!");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
