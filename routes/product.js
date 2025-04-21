const express = require('express');
const router = express.Router();
const productController = require('../controlleres/product');
router.get("/product",productController.productList)  
router.post('/create', productController.createProduct);
router.get('/getallproducts', productController.getAllProduct);
router.get('/getproduct/:id', productController.getProductById);
router.post('/updateproduct/:id', productController.updateProduct);
router.post('/products/:id', productController.deleteProducts);

module.exports = router;
