const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8080;
const dbconnect = require('./models/index');
const userRouter = require('./routes/userRoute');
const bookRouter = require('./routes/bookRoute');
const orderRouter = require('./routes/orderRoute');
const serializeUser = require('./services/authService');
const authRouter = require('./routes/authRoute');
const mongoStore = require('connect-mongo');
const getUserFromJWT = require('./middlewares/getUserFromJWT');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const pageRouter = require('./routes/pageRoute');
const categoryRouter = require('./routes/categoryRoute');
require('dotenv').config();

const connect = process.env;
const url = `mongodb://${connect.username}:${connect.password}@${connect.url}/${connect.dbname}?authSource=${connect.authSource}`;

serializeUser();
dbconnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(passport.initialize());

app.use('/auth', authRouter);

app.use('/users', userRouter);
app.use('/books', bookRouter);
app.use('/orders', orderRouter);
app.use('/categories', categoryRouter);
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
