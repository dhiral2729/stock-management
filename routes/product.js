const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const productController = require('../controlleres/product');
const Product = require('../models/product');
const jwt = require('jsonwebtoken');
const Category = require('../models/category');
router.get('/product', async (req, res) => {
    
    try {
      const categories = await Category.find({});
      const products = await Product.find().populate('category')
        
      let token = req.cookies.token;
      if (!token) {
        return res.redirect('/login');
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      return res.render('product', {
        categories,
        products,
        token: decoded,
      });
    } catch (err) {
      console.error("Error in /admin/product:", err.message);
      return res.status(401).redirect('/login');
    }
});
  
router.post('/create', productController.createProduct);
router.get('/getallproducts', productController.getAllProduct);
router.get('/getproduct/:id', productController.getProductById);
router.post('/updateproduct/:id', productController.updateProduct);
router.post('/products/:id', productController.deleteProducts);

module.exports = router;
