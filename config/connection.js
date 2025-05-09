const mongoose = require('mongoose');
const MongoUrl = process.env.MONGO_URI;

const connectTomongodb = async (req,res) => {
  mongoose
    .connect('mongodb://localhost:27017/sms')
    .then(() => console.log('mongo connected:'))
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  connectTomongodb,
};
