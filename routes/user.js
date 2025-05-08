const express = require('express');
const router = express.Router();
const Product=require("../models/product")
const Stock=require("../models/stock")
const jwt = require('jsonwebtoken');
const authController = require('../controlleres/user');
const { requireAuth } = require('../middleware/auth');
const User = require('../models/user');
const Category = require('../models/category');

// Routes
router.get('/', authController.loadHome);

router.get('/signup', (req, res) => {
  res.render('signup')
});
router.post('/signup', authController.handlesignup);

router.get('/login', (req, res) => res.render('login', {error: null }));
router.post('/login', authController.loginUser);

router.get('/logout', authController.logout);

//dashboard
router.get('/admin/dashboard', requireAuth, (req, res) => {
  let token = req.cookies.token;
  token = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(token)
  return res.render('admindashboard', { token });
});
router.get('/admin/profile',authController.shopadminprofile)
router.get('/superadmin/dashboard', requireAuth, async(req, res) => {
  let token = req.cookies.token;
  token = jwt.verify(token, process.env.JWT_SECRET);
  //  console.log(token)
  const user = await User.find();
  let count =0;
  user.map(()=>{
    count++;
  })
  const product=await Product.find();
  let productcount=0;
  product.map(()=>{
    productcount++
  })
  const category=await Category.find();
  let categorycount=0;
  category.map(()=>{
    categorycount++
  })

  return res.render('superadmindashboard', { token, count ,productcount,categorycount});
});


module.exports = router;
