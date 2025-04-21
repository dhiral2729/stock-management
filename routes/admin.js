const express = require('express');
const router = express.Router();
const admincontroller = require('../controlleres/admin');
// const purchaseControoler=require("../controlleres/purchase")
const User = require('../models/user');
router.get('/users', admincontroller.getAllUsers);
router.get('/update/:id', admincontroller.editForm);
router.post('/update/:id', admincontroller.updateUsers);
router.post('/users/:id', admincontroller.deleteUser);
router.get('/report',admincontroller.handleReport)

// router.put('/admin/update/:id', async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const { name, email, isApproved } = req.body
//    if (!name || !email) {
//       return res.status(400).json({ error: 'Name and email are required' });
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         name,
//         email,
//         isApproved: isApproved === 'true',
//       },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.status(200).json({ message: 'User updated successfully' });
//   } catch (error) {
//     console.error('Update Error:', error);
//     res.status(500).json({ error: 'Update failed' });
//   }
// });
module.exports = router;
