const express = require('express');
const mongoose = require('mongoose');
const Fdb = require('./model/dbSchema');
const farmer = express();
require('./model/db');
const Farmer = require("./model/dbSchema");
const database = require("./routes/dbRoute");
const bankData = require('./routes/paymentRoute');
const login = require('./routes/loginRoute');
const bcrypt = require('bcryptjs');
const port = process.env.PORT || 3000;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const auth = require('./middleware/authJwt');

farmer.use(express.json());

farmer.use(cookieParser());



//farmer signup
farmer.use("/farmer/signup" , database); 

//farmer bank details
farmer.use('/farmer/bank-data',bankData);

//farmer login
farmer.use('/farmer/login',login);

//farmer home 
farmer.get("/farmer",auth,(req,res)=>{
    res.send("hello from farmer");
    
});

farmer.get('/farmer/logout',auth,async(req,res)=>{
    try {
        res.clearCookie('jwt');
        res.send('logout successfull');
    } catch (error) {
        console.log(error);
    }
})


farmer.get('/farmer/home', (req,res)=>{
    
})

//listning port
module.exports = farmer.listen(port);