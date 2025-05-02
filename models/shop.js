const mongoose = require("mongoose");

const shopSchema=new mongoose.Schema({
 name:{
    type:String
 },
 email:{
    type:String,
    required:true
 },
 password:{
    type:String,
    required:true
 },
 role:{
    type:String,
    enum:['superAdmin','shopAdmin','shopUser'],
    default:'shopUser'
 },
 categoryName:{
    type:mongoose.Schema.Types.ObjectId,
   ref:"category"
 },
 createdBy: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'User'
 }
},{timestamps:true})

const Shop = new mongoose.model('shop', shopSchema);
module.exports = Shop;


