const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// SIGNUP
const handlesignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    return res.redirect('/login');
  } catch (error) {
    res.status(500).json({ message: 'SignUp:- Server error:' + error });
  }
};

// LOGIN
const login = async (req, res) => {
  const {email,password}=req.body
  if(
    email===process.env.ADMIN_EMAIL &&
    password===process.env.ADMIN_PASSWORD
  ){
    const token=jwt.sign(
      {id:'admin',role:'admin'},
      process.env.JWT_SECRET
    )
    res.cookie('token',token)
    return res.redirect("/admin/dashboard")
  }
  try{
    const user=await User.findOne({email})
    if(!user){
      return res.render("login",{
       message:"user not found",
       type:"error"
      }
      )
    }
    const isMatch =  bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('login', {
        message: 'Invalid credentials',
        type: 'error',
      });
    }
 
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    res.cookie('token', token);
    return res.redirect('/user/dashboard');

  }
  catch(err) {
    console.error('Login error:', err);
    return res.render('login', {
      message: 'Login failed. Try again later.',
      type: 'error',
    });
  }
  
}
// LOGOUT
const logout = (req, res) => {
  try {
    res.clearCookie('token');
    res.redirect('/login');
  } catch (error) {
    res.status(500).json({ message: 'Logout failed: ' + error.message });
  }
};

module.exports = {
 handlesignup,
  login,
  logout,
};
