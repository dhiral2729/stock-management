const Category = require('../models/category');
const jwt = require('jsonwebtoken');

exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    let token = req.cookies.token;
    token = jwt.verify(token, process.env.JWT_SECRET);

    res.render('category', {
      categories,
      token,
      success: req.flash('success'),
      error: req.flash('error'),
      msg: req.flash('msg')
    });
  } catch (err) {
    console.log(err);
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const existingCategory = await Category.findOne({ name });
    let token = req.cookies.token;
    token = jwt.verify(token, process.env.JWT_SECRET);

    if (existingCategory) {
      req.flash('error', 'Category already exists');
      return res.redirect('/admin/category');
    } else {
      const newCategory = new Category({ name });
      await newCategory.save();

      req.flash('success', 'Category added successfully');
      return res.redirect('/admin/category');
    }
  } catch (error) {
    console.log(error);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    req.flash('success', 'Category deleted successfully');
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
      req.flash('error', 'Category name already exists');
      return res.redirect('/admin/category');
    }

    await Category.findByIdAndUpdate(id, { name });
    req.flash('success', 'Category updated successfully');
    res.redirect('/admin/category');
  } catch (error) {
    console.error(error);
  }
};
