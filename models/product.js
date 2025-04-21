const mongoose=require("mongoose")
const Category = require('./category')
//schema
const productSchema=new mongoose.Schema({
  productName:{
    type:String,
    required:true
  },
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
    required:true
  },
  price:{
    type:Number
  },
  isBestSeller:{
    type:Boolean,

  }
})
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
module.exports=Product