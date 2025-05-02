const express = require('express');
const router = express.Router();
const categoryController = require('../controlleres/category');
const{requireAuth}=require("../middleware/auth")
const multer = require("multer");
const storage = multer.memoryStorage(); // or use diskStorage for file uploads
const upload = multer({ storage })
router.get('/category', requireAuth,categoryController.getCategory);
router.post('/categories/add',upload.none(), categoryController.addCategory);
router.post('/categories/delete/:id',categoryController.deleteCategory);
router.post('/categories/update/:id',categoryController.updateCategory);

module.exports = router;
