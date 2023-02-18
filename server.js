const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8080;
const dbconnect = require('./models/index');
const userRouter = require('./routes/userRoute');
const bookRouter = require('./routes/bookRoute');
const orderRouter = require('./routes/orderRoute');
const testRouter = require('./routes/testRouter');

dbconnect();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', userRouter);
app.use('/book', bookRouter);
app.use('/order', orderRouter);
app.use('/test', testRouter);
app.use('*', (req, res) => {
  res.status(404);
});

app.use(async (err, req, res, next) => {
  console.log(err.message);
  res.status(200).json({ Error: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
