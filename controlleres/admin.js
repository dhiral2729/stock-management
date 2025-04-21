const User = require('../models/user');
const Purchase = require('../models/purchase');
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
module.exports = {
  getAllUsers,
  editForm,
  deleteUser,
  handleReport,
};
