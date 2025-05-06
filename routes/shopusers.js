const express = require('express');
const router = express.Router();
const shopuserscontroller=require("../controlleres/shopusers")
router.post("/shopusers",shopuserscontroller.createShopUsers)
module.exports = router;
