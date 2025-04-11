const Product = require('../models/product');
const mongoose = require('mongoose');


exports.createProduct = async (req, res) => {
  try {
    const { productName, category, price } = req.body;
    const isBestSeller = req.body.isBestSeller === 'on';
    if (!productName || !category || !price   ) {
      return res.status(400).send('All fields are required');
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).send('Invalid category ID');
    }

    const newProduct = new Product({ productName, category, price, isBestSeller });
    await newProduct.save();
   
    

    res.redirect('/admin/product');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Get All Products
exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find().populate('category'); 
    res.render('products', { products });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};


exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }

    
    res.render('product', { product }); 
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      productName: req.body.productName,
      price: req.body.price,
      category: req.body.category,
      isBestSeller: req.body.isBestSeller === 'on',
    }, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).send('Product not found');
    }
    return res.redirect('/admin/product'); 
  } catch (error) {
    console.error(error);
    res.status(400).send('Failed to update product');
  }
};


// Delete Product
exports.deleteProducts = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).send('Product not found');
    }

    // Redirect after delete
    res.redirect('/admin/product');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

