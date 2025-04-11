// routes/admin.js (or your route file)
const express = require('express');
const router = express.Router();
const stockController = require('../controlleres/stock');
const mongoose=require("mongoose")

router.get('/stocks/add', stockController.getStockPage);
router.post('/stocks/add', stockController.addStock);
router.post('/stocks/update/:id', stockController.updateStock);
router.post('/stocks/delete/:id', stockController.deleteStock);

module.exports = router;
