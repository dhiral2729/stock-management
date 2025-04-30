const Product = require('../models/product');
const Category = require('../models/category');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

exports.createProduct = async (req, res) => {
  try {
    const { productName, category, price } = req.body;
    const isBestSeller = req.body.isBestSeller === 'on';
    if (!productName || !category || !price) {
      return res.status(400).send('All fields are required');
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).send('Invalid category ID');
    }
    const existingProduct = await Product.findOne({ productName, category });
    if (existingProduct) {
      return res.status(404).redirect('/admin/product');
    }
    const newProduct = new Product({
      productName,
      category,
      price,
      isBestSeller,
    });
    await newProduct.save();

    res.redirect('/admin/product');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    let token = req.cookies.token;
    token = jwt.verify(token, process.env.JWT_SECRET);
    return res.redirect('/admin/product');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }

    let token = req.cookies.token;
    token = jwt.verify(token, process.env.JWT_SECRET);

    res.redirect('/admin/product');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        productName: req.body.productName,
        price: req.body.price,
        category: req.body.category,
        isBestSeller: req.body.isBestSeller === 'on',
      },
      {
        new: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).send('Product not found');
    }
    return res.redirect('/admin/product');
  } catch (error) {
    console.error(error);
    res.status(400).send('Failed to update product');
  }
};

exports.deleteProducts = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).send('Product not found');
    }

    res.redirect('/admin/product');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
exports.productList = async (req, res) => {
  try {
    const categories = await Category.find({});
    const products = await Product.find().populate('category');

    let token = req.cookies.token;
    if (!token) {
      return res.redirect('/login');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    return res.render('product', {
      categories,
      products,
      token: decoded,
      success: 'product added',
      error: null,
    });
  } catch (err) {
    console.log(err);
  }
};
