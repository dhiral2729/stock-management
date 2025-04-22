const User = require('../models/user');
const Purchase = require('../models/purchase');
const product = require('../models/product');
const Stock = require('../models/stock');
const jwt = require('jsonwebtoken');
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } });
    let token = req.cookies.token;
    token = jwt.verify(token, process.env.JWT_SECRET);
    res.render('adminusers', { users, token });
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
const purchaseHistory = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const purchases = await Purchase.find()
      .populate('buyer', 'name')
      .populate('product', 'productName quantity');
      const stocks = await Stock.find()
      .populate('product', 'productName quantity');
   
   
    const summaryMap = new Map();
   stocks.forEach(stock => {
      const prodId = stock.product?._id.toString();
      if (!summaryMap.has(prodId)) {
        summaryMap.set(prodId, {
          productName: stock.product?.productName || "N/A",
          totalStock: stock.product?.quantity || 0,
          purchasedQuantity: 0
        });
      }
      summaryMap.get(prodId).totalStock += stock.quantity;
    });

    purchases.forEach(purchase => {
      const prodId = purchase.product?._id.toString();
      if (!summaryMap.has(prodId)) {
        summaryMap.set(prodId, {
          productName: purchase.product?.productName || "N/A",
          totalStock: purchase.product?.quantity || 0,
          purchasedQuantity: 0
        });
      }
      summaryMap.get(prodId).purchasedQuantity += purchase.quantity;
    });

    const summary = Array.from(summaryMap.values());

    res.render('history', { purchases, summary ,token,decoded});

  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};
module.exports = {
  getAllUsers,
  editForm,
  deleteUser,
  handleReport,
  purchaseHistory,
};
