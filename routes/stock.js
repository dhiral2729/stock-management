// routes/admin.js (or your route file)
const express = require('express');
const router = express.Router();
const stockController = require('../controlleres/stock');
const{ requireAuth}=require("../middleware/auth")
router.get('/stocks/add',requireAuth, stockController .getStockPage);
router.post('/stocks/add',stockController.addStock);
router.post('/stocks/update/:id', stockController.updateStock);
router.post('/stocks/delete/:id', stockController.deleteStock);

module.exports = router;
