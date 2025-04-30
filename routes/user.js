const express = require('express');
const router = express.Router();
const Product=require("../models/product")
const Stock=require("../models/stock")
const jwt = require('jsonwebtoken');
const authController = require('../controlleres/user');
const { requireAuth } = require('../middleware/auth');

// Routes
router.get('/', authController.loadHome);

router.get('/signup', (req, res) => {
  res.render('signup');  // `success_msg` and `error_msg` should be available here
});
router.post('/signup', authController.handlesignup);

router.get('/login', (req, res) => res.render('login', {error: null }));
router.post('/login', authController.loginUser);

// router.get('/login', (req, res) => res.render('login'));
// // router.post('/login', authController.loginAdmin);


router.get('/logout', authController.logout);

//dashboard
router.get('/admin/dashboard', requireAuth, (req, res) => {
  let token = req.cookies.token;
  token = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(token)
  return res.render('admindashboard', { token });
});


module.exports = router;
