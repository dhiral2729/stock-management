// controllers/shopController.js
const Shop = require('../models/shop');
const bcrypt=require("bcrypt")
const jwt = require('jsonwebtoken');

exports.createShop = async (req, res) => {
  try {
    const { name, email, password, role, createdBy, shopAdminFor } = req.body;
    const hashpassword=await bcrypt.hash(password,10)


    const newShop = new Shop({
      name,
      email,
      password:hashpassword, 
      role,
      createdBy, 
      shopAdminFor, 
    });
    await newShop.save();
    // console.log(newShop);
     res.status(201).json({ message: 'Shop created successfully!', shop: newShop });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getShops = async (req, res) => {
  try {
    const shops = await Shop.find({ });

    
    res.status(200).json({
      msg: "shopadmin created successfully",
      shops
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id).populate('categoryName createdBy shopAdminFor');

    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    res.status(200).json(shop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
