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
    const nameRegex = /^[A-Za-z\s]{2,}$/;

    if (!nameRegex.test(name)) {
      return res.status(400).render('signup', { error: 'Name must contain only letters and at least 2 characters' });
    }

    if (password !== confirm_password) {
      return res.status(400).render('signup', { error: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('signup', { error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

  
    return res.render('login', { success: 'Signup successful!' });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).render('signup', { error: 'Server error. Please try again.' });
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
    if (!isMatch) return res.render('login', { error: 'incorrect Password' });

    if (user.role === 'admin') {
      const token = createTokenForAdmin(user.email, user.password, user.name);
      res.cookie('token', token);

      return res.redirect('/admin/dashboard');
    } else if (user.role === 'user') {
      const token = createTokenForUser(user.email, user.password, user.name);
      res.cookie('token', token);
   
      return res.redirect('/user/dashboard');
    } else {
      return res.render('login', { error: 'Error logging in user/admin' });
    }
  } catch (err) {
    res.render('login', { error: 'Something went wrong!', email });
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
