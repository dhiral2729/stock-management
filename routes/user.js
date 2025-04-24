const express = require('express');
const router = express.Router();
const Product=require("../models/product")
const Stock=require("../models/stock")
const jwt = require('jsonwebtoken');
const authController = require('../controlleres/user');
const { requireAuth } = require('../middleware/auth');

// Routes
router.get('/', authController.loadHome);
router.get('/signup', (req, res) => res.render('signup'));
router.post('/signup', authController.handlesignup);

router.get('/login', (req, res) => res.render('login'));
router.post('/login', authController.login);

router.get('/logout', authController.logout);

//dashboard
router.get('/admin/dashboard', requireAuth, (req, res) => {
  let token = req.cookies.token;
  token = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(token)
  return res.render('admindashboard', { token });
});

// router.get('/user/dashboard', requireAuth, async(req, res) => {
//   let token = req.cookies.token;
//   token = jwt.verify(token, process.env.JWT_SECRET);
//   const search = req.query.search || '';
//   const query = search
//     ? { productName: { $regex: search, $options: 'i' } }
//     : {};

//   const products = await Product.find(query).populate('category');
//   console.log(products.category)
//   return res.render('udashboard',{token , search, products});
// });

module.exports = router;
