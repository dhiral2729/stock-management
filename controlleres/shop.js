const Shop=require("../models/shop")
const bcrypt=require("bcrypt")
const createSuperAdmin=async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        const newAdmin=new Shop({name,email,password,role:"shopAdmin"})
        await newAdmin.save()
        res.status(200).json({msg:"shop admin created successfully"})
    }
    catch(error){
        console.log(error);  
    }
}
module.exports={
    createSuperAdmin
}