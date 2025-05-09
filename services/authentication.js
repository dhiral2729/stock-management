const jwt = require('jsonwebtoken');

const secreteKey = process.env.JWT_SECRET;

function createTokenForUser(email, password,name) {
  const payload = {
  
    name,
    email,
    password,

   
  };                                                                                                   
                                
  const token = jwt.sign(payload, secreteKey);
  return token;
}
function createTokenForAdmin(email, password,name) {
  const payload = {
    email,
    name,
    password,
  
  };
  const adminToken = jwt.sign(payload, secreteKey);
  return adminToken;
}
function creatTokenForShopUsers(name,email,role,shopId){
  const payload={
    name,
    email,
    role,
    shopId,

  }
  // console.log(payload);
  
  const shopusertoken=jwt.sign(payload,secreteKey);
  return shopusertoken;
}
function validatetokenForShopUsers(shopusertoken ) {
  const payload = jwt.verify(shopusertoken, secreteKey);
  // console.log(payload)
  return payload;
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

module.exports = {
  createTokenForUser,
  createTokenForAdmin,
  creatTokenForShopUsers,
  validatetoken,
  validatetokenForUser,
  validatetokenForShopUsers

  
  
};
