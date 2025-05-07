const bcrypt = require('bcrypt');
const {
  createTokenForAdmin,
  createTokenForUser,
} = require('../services/authentication');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const handlesignup = async (req, res) => {
  try {
    const { name, email, password, confirm_password } = req.body;
    if(!name){
      req.flash('error', 'Name is required!');
      return res.redirect('/signup');
    }
    if(!email){
      req.flash('error', 'Email is required!');
      return res.redirect('/signup');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // req.flash('error', 'Email is already registered.');
      return res.redirect('/signup');
    }

    if (password !== confirm_password) {
      // req.flash('error', 'Passwords do not match!');
      return res.redirect('/signup');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // req.flash('success', 'Signup successful! Please log in.');
    return res.redirect('/login');

  } catch (error) {
    console.error('Signup error:', error);
    req.flash('error', 'Server error. Please try again.');
    return res.redirect('/signup');
  }
};

const loadHome = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.redirect('/login');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role === 'admin') {
      return res.redirect('/admin/dashboard');
    } else {
      return res.redirect('/user/dashboard');
    }
  } catch (error) {
    return res.redirect('/login');
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.render('login', { error: 'User not found, please sign up' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.render('login', { error: 'Incorrect password' });

    let token;
    if (user.role === 'superadmin') {
      token = createTokenForAdmin(user.email, user.password, user.name); 
      res.cookie('token', token);
      return res.redirect('/superadmin/dashboard');
    } else if (user.role === 'shopadmin') {
      token = createTokenForAdmin(user.email, user.password, user.name);
      res.cookie('token', token);
      return res.redirect('/admin/dashboard');
    } else if (user.role === 'user') {
      token = createTokenForUser(user.email, user.password, user.name);
      res.cookie('token', token);
      return res.redirect('/user/dashboard');
    } else {
      return res.render('login', { error: 'Invalid user role' });
    }
  } catch (err) {
    res.render('login', {  error: 'Invalid email or password' , email });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie('token');
    res.redirect('/login');
  } catch (error) {
    res.status(500).json({ message: 'Logout failed: ' });
  }
};
module.exports = {
  handlesignup,
  loginUser,
  logout,
  loadHome,
};
