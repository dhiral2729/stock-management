const jwt = require('jsonwebtoken');

const secreteKey = process.env.JWT_SECRET;

function createTokenForUser(email, password,name) {
  const payload = {
  
    name,
    email,
    password
  };                                                                                                   
                                
  const token = jwt.sign(payload, secreteKey);
  return token;
}
function createTokenForAdmin(email, password,name) {
  const payload = {
    email,
    name,
    password
  };
  const adminToken = jwt.sign(payload, secreteKey);
  return adminToken;
}

function validatetokenForUser(userToken ) {
  const payload = jwt.verify(userToken, secreteKey);
  // console.log(payload)
  return payload;
}

function validatetoken(adminToken ) {
  const payload = jwt.verify(adminToken, secreteKey);
  // console.log(payload);
  
  return payload;
}
function createTokenForShop(id,role,email) {
  const payload = {
  
   id,
   role,
   email
  };                                                                                                   
                                
  const token = jwt.sign(payload, secreteKey);
  console.log(token);
  
  return token;
}
function validatetokenShop( shopToken) {
  const payload = jwt.verify(shopToken, secreteKey);
  // console.log(payload);
  
  return payload;
}
module.exports = {
  createTokenForUser,
  createTokenForAdmin,
  createTokenForShop,
  validatetoken,
  validatetokenForUser,
  validatetokenShop
  
  
};
