const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: true,
  },
  contactPersonName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  superAdminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
}, { timestamps: true });

const Shop = mongoose.model('Shop', shopSchema);
module.exports = Shop;
