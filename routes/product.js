const express=require("express")
const mongoose=require("mongoose")
const router=express.Router()
const productController=require("../controlleres/product")
const Product=require("../models/product")
const Category = require('../models/category')
router.post("/create",productController.createProduct)
router.get("/getallproducts",productController.getAllProduct)
router.get("/getproduct/:id",productController.getProductById)
router.post("/updateproduct/:id",productController.updateProduct)
router.post("/products/:id",productController.deleteProducts)

router.get('/product',async (req, res) => {
    const categories=await Category.find({})
    const products = await Product.find().populate('category');
    return res.render('product',{categories, products});
 });

module.exports=router

