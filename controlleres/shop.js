const Shop = require('../models/shop');
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

    await newShop.save();
    res.status(200).redirect('/superadmin/shop');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllShops = async (req, res) => {
  try {
    let token = req.cookies.token;
    token = jwt.verify(token, process.env.JWT_SECRET);
    const shops = await Shop.find().populate('superAdminId', 'email');
    if (!shops || shops.length === 0) {
      return res.status(404).json({ message: 'No shops found.' });
   
    }

    res.render('mangeshop', { shops ,token});
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
