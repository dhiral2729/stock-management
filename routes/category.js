const express = require('express');
const router = express.Router();
const categoryController = require('../controlleres/category');
router.get('/category', categoryController.getCategory);
router.post('/categories/add', categoryController.addCategory);
router.post('/categories/delete/:id', categoryController.deleteCategory);
router.post('/categories/update/:id', categoryController.updateCategory);

module.exports = router;
