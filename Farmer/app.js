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

farmer.use(express.json());

//farmer signup
farmer.use("/farmer/signup" , database); 

//farmer bank details
farmer.use('/farmer/bank-data',bankData);

//farmer login
farmer.use('/farmer/login',login);

//farmer home 
farmer.get("/farmer",(req,res)=>{
    res.send("hello from farmer");
});

//listning port
module.exports = farmer.listen(port);