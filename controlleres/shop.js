const Shop = require('../models/shop');
const bcrypt = require('bcrypt');

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
    res.status(201).json({ message: 'Shop created successfully', shop: newShop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find().populate('superAdminId', 'email');
    if (!shops || shops.length === 0) {
      return res.status(404).json({ message: 'No shops found.' });
    }

    res.status(200).json({ shops });
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

    const updatedShop = await Shop.findByIdAndUpdate(
      req.params.id,
      { shopName, contactPersonName, email },
      { new: true }
    );

    res.status(200).json({ message: 'Shop updated successfully', shop: updatedShop });
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
    res.status(200).json({ message: 'Shop deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting shop', error: error.message });
  }
};
