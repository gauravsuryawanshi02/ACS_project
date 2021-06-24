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
const { default: axios } = require('axios');

farmer.use(express.json());

farmer.use(cookieParser());



//farmer signup
farmer.use("/farmer/signup" , database); 

//farmer bank details
farmer.use('/farmer/bank-data',bankData);

//farmer login
farmer.use('/farmer/login',login);

//farmer home 
farmer.get("/dealer",auth,(req,res)=>{
    axios.get('http://localhost:5000/dealer/signup')
    .then((response)=>{
        res.send(response.data)
    }).catch((err)=>{
        console.log(err);
    })    
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