const Shop=require("../models/shop")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const createSuperAdmin=async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        const hashpassword=await bcrypt.hash(password,10)
        const newAdmin=new Shop({name,email,password:hashpassword,role:"superAdmin"})
        await newAdmin.save()
        res.status(200).json({msg:"shop admin created successfully"})
    }
    catch(error){
        console.log(error); 
        res.status(500).json({ msg: 'Internal server error' }); 
    }
}
const createShopAdmin=async(req,res)=>{
 try{
    const{name,email,password}=req.body
    const hashedPassword=await bcrypt.hash(password,10)
    const newUser=new Shop ({
        name,
        email,
        password:hashedPassword,
        role:"shopAdmin",
        createdBy:req.user._id
    })
    await newUser.save()
    const userMsg={name,email,password,role:"shopAdmin",createdBy:newUser.createdBy}
    res.status(200).json({msg:"shop admin created successfully",userMsg})
 }
 catch(error){
    console.log(error); 
    res.status(500).json({ msg: 'Internal server error' }); 
 }
}
module.exports={
    createSuperAdmin,
    createShopAdmin
}