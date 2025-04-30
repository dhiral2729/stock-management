// controllers/stockController.js
const Stock = require('../models/stock');
const Product = require('../models/product');
const jwt = require('jsonwebtoken');

exports.getStockPage = async (req, res) => {
  try {
    const stocks = await Stock.find()
      .populate('product')
      .populate('addedBy', 'name email')
      .sort({ createdAt: -1 });
    const products = await Product.find();
    let token = req.cookies.token;
    token = jwt.verify(token, process.env.JWT_SECRET);

    res.render('stock', { stocks, products, token });
  } catch (err) {
    console.error('Error fetching stock:', err);
    res.status(500).send('Internal Server Error');
  }
};
exports.addStock = async (req, res) => {
  const { product, quantity, price } = req.body;

  try {
    const existingStock = await Stock.findOne({
      product,
      addedBy: req.user.email,
    });

    if (existingStock) {
      existingStock.quantity += parseInt(quantity);
      existingStock.price = parseFloat(price);
      await existingStock.save();
    } else {
      const { product, quantity, price } = req.body;
      let token = req.cookies.token;
      token = jwt.verify(token, process.env.JWT_SECRET);
      await Stock.create({
        product,
        quantity,
        price,
        addedBy: token.name,
        success: req.query.success || null,
        error: req.query.error || null
      });
    }

    res.redirect('/admin/stocks/add');
  } catch (err) {
    console.error('Error adding stock:', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.updateStock = async (req, res) => {
  const { product, quantity } = req.body;
  try {
    await Stock.findByIdAndUpdate(req.params.id, { product, quantity });
    res.redirect('/admin/stocks/add');
  } catch (err) {
    console.error('Error updating stock:', err);
    res.status(500).send('Internal Server Error');
  }
};
exports.deleteStock = async (req, res) => {
  try {
    await Stock.findByIdAndDelete(req.params.id);

    res.redirect('/admin/stocks/add');
  } catch (err) {
    console.error('Error deleting stock:', err);
    res.status(500).send('Internal Server Error');
  }
};
