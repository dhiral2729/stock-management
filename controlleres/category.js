const Category = require('../models/category');
const jwt = require('jsonwebtoken');

exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    let token = req.cookies.token;
    token = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).render('category', { error: null, categories, token });
  } catch (error) {
    res.status(500).json({ msg: 'error' });
  }
};

exports.addCategory = async (req, res) => {  
  // console.log(req.body);
  const { name } = req.body;
  try {
    if(!name){
      return res.status(400).json({msg:"name are not required"})

      // return res.status(400).redirect("/admin/category")
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({msg:"category are not required"})

      // return res.status(400).redirect('/admin/category');
    }
    const newCategory = new Category({ name });
    await newCategory.save();

    res.status(200).redirect('/admin/category');
  } catch (error) {
    res.status(500).json({ msg: 'error' });
  }
};
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    res.status(200).redirect('/admin/category');
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};
exports.updateCategory = async (req, res) => {


  const { id } = req.params;
  // console.log(id);
 
const {name}=req.body;
  // console.log(name);

  try {
    if(!name){
      return res.status(404).json({ msg: 'name are not required' });
    }
    await Category.findByIdAndUpdate(id, { name }, { new: true });
    res.status(200).redirect('/admin/category');
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ msg: 'error' });
  }
};
