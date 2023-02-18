const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8080;
const dbconnect = require('./models/index');
const userRouter = require('./routes/userRoute');
const bookRouter = require('./routes/bookRoute');
const orderRouter = require('./routes/orderRoute');
dbconnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/book', bookRouter);
app.use('/order', orderRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
