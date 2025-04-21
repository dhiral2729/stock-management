const jwt = require('jsonwebtoken');
const User=require("../models/user")
const{validatetoken,validatetokenForUser}=require("../services/authentication")
const requireAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.redirect('/login');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect('/login');
  }
};
function checkForAuthenticationCookie(adminToken){
  return(req,res,next)=>{
    const tokenvalue = req.cookies[adminToken];
    if(!tokenvalue){
      return next();
    }
    try {
      const userPayload = validatetoken(tokenvalue);
      req.user = userPayload;
      res.locals.user = userPayload; 
    } catch(err){
      console.log(err);
    }
    return next();
  }
}
function checkForAuthenticationCookieUser(userToken){
  return(req,res,next)=>{
    const tokenvalue = req.cookies[userToken];
    if(!tokenvalue){
      return next();
    }
    try {
      const userPayload = validatetokenForUser(tokenvalue);
      req.user = userPayload;
      res.locals.user = userPayload; 
    } catch(err){
      console.log(err);
    }
    return next();
  }
}
module.exports = {
  requireAuth,
   checkForAuthenticationCookie,
   checkForAuthenticationCookieUser
};



