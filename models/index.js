const mongoose = require('mongoose');
require('dotenv').config();

const connect = process.env;

const url = `mongodb://${connect.username}:${connect.password}@${connect.url}/${connect.dbname}?authSource=${connect.authSource}`;

// const url = 'mongodb://bookadmin:admin12345@elice.iptime.org:27017/bookstore?authMechanism=DEFAULT&authSource=admin';

mongoose.set('strictQuery', false);

const dbconnect = () => {
  mongoose.connect(url, (error) => {
    if (error) {
      console.log('mongodb connect error', error);
    } else {
      console.log('mongodb-connect-success');
    }
  });
};

module.exports = dbconnect;
