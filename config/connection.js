const mongoose = require('mongoose');
const MongoUrl = process.env.MONGO_URI;

const connectTomongodb = async (req,res) => {
  mongoose
    .connect(MongoUrl)
    .then(() => console.log('mongodb connected'))
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  connectTomongodb,
};
