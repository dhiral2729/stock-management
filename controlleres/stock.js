// controllers/stockController.js
const Stock = require('../models/stock');
const Product = require('../models/product');
const mongoose = require('mongoose');

exports.getStockPage = async (req, res) => {
  try {
    const stocks = await Stock.find()
      .populate('product')
      .sort({ createdAt: -1 });

    const products = await Product.find();

    res.render('stock', { stocks, products });
  } catch (err) {
    console.error('Error fetching stock:', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.addStock = async (req, res) => {
  const { product, quantity } = req.body;
  try {
    await Stock.create({
      product,
      quantity,
      
    });
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
