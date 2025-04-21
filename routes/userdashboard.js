const express = require('express');
const router = express.Router();
const userController = require('../controlleres/userdashboard'); 
router.get('/dashboard', userController.userDashboard);
router.get('/allstocks', userController.userStocks);
router.get('/buy/:id', userController.getBuyPage);
router.post('/buy/:id',userController.handlepurchase)
router.get("/report",userController.handlePurchaseReport)
module.exports = router;
