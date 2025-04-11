const mongoose = require('mongoose');

const connectTomongodb = async (url) => {
  mongoose
    .connect('mongodb://127.0.0.1:27017/sms')
    .then(() => console.log('mongo connected:'))
    .catch((err) => {
      console.log(err);
    });
};


module.exports = {
  connectTomongodb,
};
