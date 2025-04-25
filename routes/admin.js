const express = require('express');
const router = express.Router();
const admincontroller = require('../controlleres/admin');
const{requireAuth}=require("../middleware/auth")
router.get('/users',requireAuth, admincontroller.getAllUsers);
router.get('/update/:id', requireAuth,admincontroller.editForm);
router.post('/users/:id',requireAuth, admincontroller.deleteUser);
router.get('/report',requireAuth, admincontroller.handleReport);
router.get("/history/:id",requireAuth, admincontroller.viewProductHistory);
router.post("/users",requireAuth,admincontroller.createUsers)


module.exports = router;
