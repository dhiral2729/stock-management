const { default: bcrypt } = require('bcryptjs');
const User=require("../models/user")
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}); 
        res.render('adminusers', { users }); 
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
  // console.log(user);
  
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
module.exports = { getAllUsers ,updateUsers,editForm,deleteUser};
