const Shopuser=require("../models/shopuser")
const bcrypt=require("bcrypt")
exports.createShopUsers=async(req,res)=>{
    try{
    const{username,email,password}=req.body;
    const existingShop = await Shopuser.findOne({ email });
    if (existingShop) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    const hashpassword= await bcrypt.hash(password,10)
    const newShopUser=new Shopuser({
    username,
    email,
    password:hashpassword

    })
    await newShopUser.save()
    res.status(201).json({ message: 'User created successfully', shop: newShopUser });
    }
    catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
