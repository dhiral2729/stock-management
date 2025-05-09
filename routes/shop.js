const express = require('express');
const router = express.Router();
const shopcontroller=require("../controlleres/shop")
const{checkForAuthenticationCookieShopUsers}=require("../middleware/auth");
const { route } = require('./user');
router.post("/shop",shopcontroller.createShop)
router.get("/shop",shopcontroller.getAllShops)
router.post("/update/shop/:id",shopcontroller.updateShop)
router.post("/delete/shop/:id",shopcontroller.deleteShop)
router.get('/reports', shopcontroller.shopReport);
router.get("/profile",shopcontroller.profile)
router.post("/shopusers",checkForAuthenticationCookieShopUsers,shopcontroller.createShopUsers)
// router.get(
//   "/shopusers",
//   checkForAuthenticationCookieShopUsers("shopusertoken"),
//   shopcontroller.getUserShopAdmin
// );


module.exports = router;
