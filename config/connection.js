const mongoose = require('mongoose');

const connectTomongodb = async () => {
  const mongoUrl = process.env.MONGO_URI;
  if (!mongoUrl) throw new Error('MONGODB_URI not set');
  await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('MongoDB connected');
};

module.exports = {
  connectTomongodb,
};
