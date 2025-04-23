const mongoose = require('mongoose');

const connectTomongodb = async (url) => {
  mongoose
    .connect('mongodb+srv://rahilsaiyed1711:rG60ylVvlbJjGWGu@cluster0.mi8dtk0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('mongo connected:'))
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  connectTomongodb,
};
