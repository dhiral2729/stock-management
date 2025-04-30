const express = require('express');
const router = express.Router();
const shopcontrooler=require("../controlleres/shop")
router.post('/admin/shop',shopcontrooler.createSuperAdmin)
module.exports = router;