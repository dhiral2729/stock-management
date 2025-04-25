const express = require('express');
const router = express.Router();
const categoryController = require('../controlleres/category');
const{requireAuth}=require("../middleware/auth")
router.get('/category', requireAuth,categoryController.getCategory);
router.post('/categories/add',requireAuth, categoryController.addCategory);
router.post('/categories/delete/:id', requireAuth,categoryController.deleteCategory);
router.post('/categories/update/:id',requireAuth, categoryController.updateCategory);

module.exports = router;
