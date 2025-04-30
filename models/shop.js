const mongoose = require("mongoose");

const shopSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    contactNumber:{
        type:String,
        required:true
    },
    address:{
        type:String
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
    }
},{timestamps:true})

const Shop = new mongoose.model('shop', shopSchema);
module.exports = Shop;

