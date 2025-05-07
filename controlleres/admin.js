const User = require('../models/user');
const Purchase = require('../models/purchase');
const product = require('../models/product');
const Stock = require('../models/stock');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Product = require('../models/product');
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } });
    let token = req.cookies.token;
    token = jwt.verify(token, process.env.JWT_SECRET);

    res.render('adminusers', { users, token, editUser: null });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const editForm = async (req, res) => {
  const user = await User.findById(req.params.id);

  res.render('adminusers', { user });
};

deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.redirect('/admin/users');
  } catch (err) {
    res.render('adminusers', { error: 'Error deleting category' });
  }
};

const handleReport = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const allPurchase = await Purchase.find({})
      .populate('product')
      .populate('buyer')
      .sort({ purchasedAt: -1 })
      .lean();
    return res.render('adminreport', {
      purchases: allPurchase,
      token: decoded,
      username: decoded.name,
    });
  } catch (err) {
    console.log(err);
  }
};
const viewProductHistory = async (req, res) => {
  try {
    const productId = req.params.id;
    let token = req.cookies.token;
    token = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);

    const product = await Product.findById(productId);
    const purchases = await Purchase.find({ product: productId })
      .populate('buyer', 'name')
      .populate('product', 'productName');
    const stockHistory = await Stock.find({ product: productId });

    const totalStock = stockHistory.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    const purchasedQuantity = purchases.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    const summary = [
      {
        productName: product.productName,
        totalStock,
        purchasedQuantity,
      },
    ];

    res.render('history', {
      token,

      summary,
      purchases,
      stockHistory,
      product,
    });
  } catch (err) {
    console.log(err);
  }
};
const createUsers = async (req, res) => {
  try {
    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.redirect('/admin/users', token, decoded);
  } catch (err) {
    console.log('Error creating user:', err);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = {
  getAllUsers,
  editForm,
  deleteUser,
  handleReport,
  viewProductHistory,
  createUsers,


};
