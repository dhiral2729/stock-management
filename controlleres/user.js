const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {
  createTokenForAdmin,
  createTokenForUser,
} = require('../services/authentication');

const handlesignup = async (req, res) => {
  try {
    const { name, email, password, confirm_password } = req.body;
    
    if (password !== confirm_password) {
      return res.status(400).render('signup', {
        error: 'Passwords do not match',
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).render('signup', {
        error: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    return res.redirect('/login');
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).render('signup', {
      error: 'Server error. Please try again.',
    });
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

const login = async (req, res) => {
  const { email, password } = req.body;
  const admin = await User.findOne({ email });
  if (admin.role == 'admin') {
    const token = createTokenForAdmin(email, password, admin.name);
    res.cookie('token', token);
    return res.redirect('/admin/dashboard');
  }
  try {
    const user = await User.findOne({ email });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Enter a valid email address.");
    }
    // console.log(user)
    if (!user) {
      return res.render('login', {
        message: 'user not found',
        type: 'error',
      });
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('login', {
        message: 'Invalid credentials',
        type: 'error',
      });
    }

    const token = createTokenForUser(email, password, user.name);
    // console.log(token)
    res.cookie('token', token);
    return res.redirect('/user/dashboard');
    
  } catch (err) {
    console.error('Login error:', err);
    return res.render('login', {
      message: 'Login failed. Try again later.',
      type: 'error',
    });
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
  login,
  logout,
  loadHome

};
