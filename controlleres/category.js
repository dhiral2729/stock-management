const Category = require('../models/category');
const jwt = require('jsonwebtoken');
exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    let token = req.cookies.token;
    //  console.log(token);

    token = jwt.verify(token, process.env.JWT_SECRET);
    return res.render('category', {                                                                                                        
       categories,
        token });
  } catch (err) {
    console.log(err);
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      res.cookie('toast_success', 'Login successful!');

      return res.redirect('/admin/category');
    } else {
      const newCategory = new Category({ name });
      await newCategory.save();
      res.status(200).redirect('/admin/category');
    }
  } catch (error) {
    console.log(error);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.redirect('/admin/category');
  } catch (err) {
    console.log(err);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const existingCategory = await Category.findOne({ name });

    if (existingCategory && existingCategory._id.toString() !== id) {
      const categories = await Category.find();
      return res.redirect('/admin/category', {
        categories,
        error: 'Category name already exists',
      });
    }

    await Category.findByIdAndUpdate(id, { name });
    let token = req.cookies.token;
    token = jwt.verify(token, process.env.JWT_SECRET);
    res.redirect('/admin/category', token, { msg: 'category are update' });
  } catch (error) {
    console.error(error);
  }
};
