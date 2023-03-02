const express = require('express');
const app = express();
const cors = require('cors');

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

const categoryRouter = require('./routes/categoryRoute');
require('dotenv').config();

console.log(process.env.PORT);
const port = process.env.PORT || 5500;
const connect = process.env;
const url = `mongodb://${connect.username}:${connect.password}@${connect.url}/${connect.dbname}?authSource=${connect.authSource}`;

serializeUser();
dbconnect();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(passport.initialize());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);
app.use('/api/orders', orderRouter);
app.use('/api/categories', categoryRouter);

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

/*
API의 정의부터 보면, 'Application Programming Interface'의 약자로서 운영체제와 응용프로그램 사이의 통신에 사용되는 언어나 메시지 형식을 이야기합니다
*/
