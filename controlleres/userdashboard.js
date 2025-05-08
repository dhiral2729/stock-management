const Product = require('../models/product');
const Stock = require('../models/stock');
const category = require('../models/category');
const Purchase = require('../models/purchase');
const jwt=require("jsonwebtoken")
const Category = require('../models/category');
const User = require('../models/user')
const userDashboard = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.redirect('/login'); 
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const search = req.query.search || '';
    const query = search
      ? { productName: { $regex: search, $options: 'i' } }
      : {};

    const products = await Product.find({
      ...query,
      category: { $ne: null },
    }).populate('category');

    res.render('udashboard', { token, products, search, token: decoded });
  } catch (error) {
    console.error('User Dashboard Error:', error.message);
    return res.redirect('/login');
  }
};


const userStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({ quantity: { $gt: 0 } })
      .populate('product')
      .lean();

    const product = await Product.find({});
    const category = await Category.find({});
    // console.log(product);
    let token = req.cookies.token;
    token = jwt.verify(token, process.env.JWT_SECRET);
    return res.render('allStocks', { product, stocks, token, category });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to load stocks.');
  }
};
const getBuyPage = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate('category');
    // console.log(product);

    const stock = await Stock.findOne({ product: productId });
    const category = await Category.find({});
    // console.log(stock);

    if (!product) {
      return res.status(404).send('Product not found');
    }
    let token = req.cookies.token;
    // console.log(token);
    
    token = jwt.verify(token, process.env.JWT_SECRET);

    res.render('buy', { product, token, stock, category });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
const handlepurchase = async (req, res) => {
  try {
    const purchaseId = req.params.id;
    // console.log(purchaseId);
    const quantity = parseInt(req.body.quantity);
    const stock = await Stock.findOne({ product: purchaseId });

    if (!stock || stock.quantity < quantity) {
      return res.status(400).send('insufficient stock');
    }
    const product = await Product.findById(purchaseId);
    if (!product) {
      return res.status(400).send('product not found');
    }
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //  console.log(decoded);
    const currUser = await User.findOne({ name: decoded.name });
    //  console.log(currUser)

    const newPurchase = new Purchase({
      product: purchaseId,
      quantity,
      buyer: currUser._id,
      price: product.price * quantity,
    });
    // console.log(newPurchase);
    await newPurchase.save();
    stock.quantity -= quantity;
    await stock.save();
    return res.redirect(`/user/buy/${purchaseId}?success=true`);
  } catch (err) {
    console.log(err);
  }
};
const handlePurchaseReport = async (req, res) => {
  try {
    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    

    const currUser = await User.findOne({ name: decoded.name });
    // console.log(currUser)

    // console.log(currUser)
    const purchase = await Purchase.find({ buyer: currUser._id })

      .populate('product')
      .populate('buyer')
      .sort({ purchasedAt: -1 })
      .lean();
    return res.render('allreport', {
      purchases: purchase,
      token: decoded,
      username: decoded.name,
    });
  } catch (err) {
    console.log(err);
  }
};
const profile=async(req,res)=>{
  try{
    const user=req.user;
    res.render('userprofile',user);
  }
  catch(error){
console.log(error);

  }
}
module.exports = {
  userDashboard,
  userStocks,
  getBuyPage,
  handlepurchase,
  handlePurchaseReport,
  profile
};
