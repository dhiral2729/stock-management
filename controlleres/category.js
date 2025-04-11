const Category = require('../models/category');

exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render('category', { error: null, categories });
  } catch (err) {
    res.render('category', {
      error: 'Failed to load categories!',
      categories: [],
    });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { name, id} = req.body;

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.render('category', { error: 'Category already exists' });
    }
    if(id){
      // update qurey
    }else{
      const newCategory = new Category({ name });
        await newCategory.save();

    }
  
    res.redirect('/admin/category');
  } catch (error) {
    res.render('category', { error: 'Error adding category' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.redirect('/admin/category');
  } catch (err) {
    res.render('category', { error: 'Error deleting category' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const existingCategory = await Category.findOne({ name });

    if (existingCategory && existingCategory._id.toString() !== id) {
      const categories = await Category.find();
      return res.render('category', {
        categories,
        error: 'Category name already exists',
      });
    }

    await Category.findByIdAndUpdate(id, { name });

    res.redirect('/admin/category');
  } catch (error) {
    console.error(error);
    const categories = await Category.find(); 
    res.render('category', { categories, error: 'Error updating category' });
  }
};
