const { default: bcrypt } = require('bcryptjs');
const User=require("../models/user")
const Purchase = require('../models/purchase');
const jwt=require("jsonwebtoken")
const getAllUsers = async (req, res) => {
    try {
      
        const users = await User.find({role:{$ne:'admin'}}); 
        let token = req.cookies.token;
        token = jwt.verify(token,process.env.JWT_SECRET)
        res.render('adminusers', { users ,token}); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
const updateUsers = async (req, res) => {
    try {
      const { userId, name, email, password, role, isApproved } = req.body;
  
      const updateData = {
        name,
        email,
        role,
        isApproved: isApproved === 'true' 
      };
  
   
      if (password && password.trim() !== "") {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(password, salt);
      }
  
      await User.findByIdAndUpdate(userId, updateData);
  
      res.redirect('/admin/users'); 
    } catch (error) {
      console.error("Update Error:", error);
      res.status(500).send("Server Error - Unable to update user");
    }
  };
const editForm=async (req,res)=>{
  const user=await User.findById(req.params.id)

  
  res.render("adminusers",{user})
}  

deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.redirect('/admin/users');
  } catch (err) {
    res.render('adminusers', { error: 'Error deleting category' });
  }
};

exports.adduser= async (req, res) => {
  try {
    const { name} = req.body;

    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.render('adminusers', { error: 'Category already exists' });
    }

    const newusers = new User({ name });
    await newusers.save();

    res.redirect('/admin/users');
  } catch (error) {
    res.render('adminusers', { error: 'Error adding category' });
  }
};
const handleReport=async(req,res)=>{
  try{
    const token=req.cookies.token
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const allPurchase=await Purchase.find({})
    .populate('product')
    .populate('buyer')
     .sort({ purchasedAt: -1 })
    .lean()
    return res.render("adminreport",{
      purchases:allPurchase,
      token:decoded,
      username:decoded.name

    })
  }
  catch(err){
    console.log(err);
    
  }
}
module.exports = { getAllUsers ,updateUsers,editForm,deleteUser,handleReport};
