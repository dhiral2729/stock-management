const express = require('express');
const router = express.Router();
const admincontroller = require('../controlleres/admin');
router.get('/users', admincontroller.getAllUsers);
router.get('/update/:id', admincontroller.editForm);
router.post('/users/:id', admincontroller.deleteUser);
router.get('/report', admincontroller.handleReport);
router.get("/history/:id", admincontroller.viewProductHistory);


module.exports = router;
