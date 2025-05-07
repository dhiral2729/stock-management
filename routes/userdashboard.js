const express = require('express');
const router = express.Router();
const userController = require('../controlleres/userdashboard'); 
const {requireAuth}=require("../middleware/auth")
router.get('/dashboard', requireAuth,userController.userDashboard);
router.get('/allstocks', requireAuth,userController.userStocks);
router.get('/buy/:id', requireAuth,userController.getBuyPage);
router.post('/buy/:id',requireAuth,userController.handlepurchase)
router.get("/report",requireAuth,userController.handlePurchaseReport)
router.get("/profile",userController.profile)
module.exports = router;
