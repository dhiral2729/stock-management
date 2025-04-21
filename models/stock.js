// models/Stock.js
const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number },
  addedBy: {type:String},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("stock", stockSchema);
