const Shop = require('../models/shop');
const User=require("../models/user")
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")

exports.createShop = async (req, res) => {
  try {
    const { shopName, contactPersonName, email, password } = req.body;

    if (!shopName || !contactPersonName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingShop = await Shop.findOne({ email });
    if (existingShop) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newShop = new Shop({
      shopName,
      contactPersonName,
      email,
      password: hashpassword,
    });
    await User.create({
      name:contactPersonName,
      email,
      password:hashpassword,
      role:"user",
      shopId: newShop._id,
      isApproved:true

    })

    await newShop.save();
    res.status(200).redirect("/superadmin/shop")
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllShops = async (req, res) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const shops = await Shop.find().populate('superAdminId', 'email');
    res.render('mangeshop', { shops, token: decoded });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.updateShop = async (req, res) => {
  try {
    const { shopName, contactPersonName, email } = req.body;

    if (!shopName || !contactPersonName || !email) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found.' });
    }
    // console.log(shop);
    
    const updatedShop = await Shop.findByIdAndUpdate(
      req.params.id,
      { shopName, contactPersonName, email },
      { new: true }
    );

    res.status(200).redirect('/superadmin/shop');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating shop', error: error.message });
  }
};

exports.deleteShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found.' });
    }

    await Shop.findByIdAndDelete(req.params.id);
    res.status(200).redirect('/superadmin/shop');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting shop', error: error.message });
  }
};
exports.shopReport = async (req, res) => {
  try {
    const shops = await Shop.find(); 
    let token = req.cookies.token;
    token = jwt.verify(token, process.env.JWT_SECRET);
    res.render('superadminreport', {
      shops,
      token
    });
  } catch (error) {
    console.error('Error fetching shop report:', error);
    res.status(500).send('Internal Server Error');
  }
};
exports.profile=async(req,res)=>{
  try{
    const user=req.user;
    res.render('profile',user);
  }
  catch(error){
console.log(error);
  }
}
exports.createShopUsers = async (req, res) => {
  try {
    // console.log(shopadmin);
    
    const shopadmin = req.user; 

    if (!shopadmin || shopadmin.role !== 'shopadmin') {
      return res.status(403).json({ msg: 'Only shopadmin can add users' });
    }

    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email already exists' });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashpassword,
      role: 'user',
      shopId: shopadmin.shopId, 
      isApproved: true
    });

    res.status(200).json({ msg: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

