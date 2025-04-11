const express = require('express');
const router = express.Router();
const authController = require('../controlleres/user');
const{requireAuth,checkRole}=require("../middleware/auth")
// Routes
router.get('/signup', (req, res) => res.render('signup'));
router.post('/signup', authController.handlesignup);

router.get('/login', (req, res) => res.render('login'));
router.post('/login', authController.login);

router.get('/logout', authController.logout);

//dashboard
router.get("/admin/dashboard",requireAuth,checkRole('admin'),(req,res)=>{
  return res.render("admindashboard")
})

router.get("/user/dashboard",requireAuth,checkRole('user'),(req,res)=>{
  return res.render("userdashboard")
})



module.exports = router;
