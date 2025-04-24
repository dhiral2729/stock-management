const express = require('express');
const router = express.Router();
const admincontroller = require('../controlleres/admin');
const{requireAuth}=require("../middleware/auth")
router.get('/users',requireAuth, admincontroller.getAllUsers);
router.get('/update/:id', admincontroller.editForm);
router.post('/users/:id', admincontroller.deleteUser);
router.get('/report', admincontroller.handleReport);
router.get("/history/:id", admincontroller.viewProductHistory);
router.post("/users",admincontroller.createUsers)
router.post('/users/edit/:id', admincontroller.editUser);

module.exports = router;
