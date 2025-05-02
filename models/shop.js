// models/shopModel.js
const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
  {
    name: {
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
    role: {
      type: String,
      enum: ['superAdmin', 'shopAdmin', 'shopUser'],
      default: 'shopUser',
    },
    categoryName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop', 
   
    },
    shopAdminFor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop', 
    },
  },
  { timestamps: true }
);

const Shop = mongoose.model('Shop', shopSchema);
module.exports = Shop;
