const express = require('express');
const router = express.Router();
const shopcontroller=require("../controlleres/shop")
router.post("/createshop",shopcontroller.createShop)
router.get("/shop",shopcontroller.getAllShops)
router.post("/update/shop/:id",shopcontroller.updateShop)
router.post("/delete/shop/:id",shopcontroller.deleteShop)
router.get('/reports', shopcontroller.shopReport);
router.get("/profile",shopcontroller.profile)

module.exports = router;
