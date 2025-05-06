const express = require('express');
const router = express.Router();
const shopcontroller=require("../controlleres/shop")
router.post("/createshop",shopcontroller.createShop)
router.get("/shop",shopcontroller.getAllShops)
router.put("/update/shop/:id",shopcontroller.updateShop)
router.delete("/delete/shop/:id",shopcontroller.deleteShop)


module.exports = router;
