const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8080;
const dbconnect = require('./models/index');
const userRouter = require('./routes/user');
const bookRouter = require('./routes/book');
dbconnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/book', bookRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
