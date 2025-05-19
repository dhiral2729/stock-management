const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
  },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  price: { type: Number, required: true },
  purchasedAt: {
    type: Date,
    default: Date.now
  }
});
const Purchase = new mongoose.model('purchase', purchaseSchema);
module.exports = Purchase;
