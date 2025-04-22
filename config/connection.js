const mongoose = require('mongoose');

const connectTomongodb = async (url) => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('mongo connected:'))
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  connectTomongodb,
};
