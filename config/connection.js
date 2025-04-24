const mongoose = require('mongoose');
const MongoUrl = process.env.MONGO_URI;

const connectTomongodb = async (req,res) => {
  mongoose
    .connect('mongodb+srv://dhiralprajapati2003:aiRDfMG5l3W12q3b@cluster0.pbe9ezq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('mongo connected:'))
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  connectTomongodb,
};
