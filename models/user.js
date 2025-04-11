const mongoose = require('mongoose');

//schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    isApproved: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);
//model
const User = mongoose.model('user', userSchema);
module.exports = User;
