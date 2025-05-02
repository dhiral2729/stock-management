// routes/shopRoutes.js
const express = require('express');
const router = express.Router();
const shopcontooler = require('../controlleres/shop');

const {authenticateUser} = require('../middleware/auth');

router.get('/shops',  shopcontooler.getShops);
// Route to create a new shop
router.post("/shops", shopcontooler.createShop);

// Route to get shop by ID
router.get('/shops/:id', shopcontooler.getShopById);

module.exports = router;
