const express = require("express")
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const bodyParser = require("body-parser");
const path = require("path");
require('dotenv').config();
const app=express()
const port=process.env.PORT || 3000
const{ connectTomongodb}=require("./config/connection")
connectTomongodb()
app.use(express.json())
app.use(cookieParser());
app.use((req,res,next)=>{
    res.set('Cache-Control', 'no-store');
    next();
})
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
const userroute= require('./routes/user')
const categoryroutes=require("./routes/category")
const adminroutes=require("./routes/admin")
const productroutes=require("./routes/product")
const shoproutes=require("./routes/shop")
const shopusersroutes=require("./routes/shopusers")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
const stockRoutes = require('./routes/stock');
const userDashboard=require("./routes/userdashboard")
const { checkForAuthenticationCookie,checkForAuthenticationCookieUser } = require("./middleware/auth");
app.use(checkForAuthenticationCookie('token'));
app.use(checkForAuthenticationCookieUser('token'))
app.use("/",userroute);
app.use("/admin",categoryroutes);
app.use("/admin",adminroutes);
app.use("/admin",productroutes);
app.use('/admin', stockRoutes);
app.use("/user",userDashboard);
app.use("/superadmin",shoproutes)
app.use("/superadmin",shopusersroutes)
app.use((req,res,next)=>{
    res.status(400).render("errorpage",{
        msg:"The page you are looking for does not exist"
    })
})
app.listen(port, () => {
  console.log(` Server is running on port ${port}`);
});