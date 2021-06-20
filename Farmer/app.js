const express = require('express');
const mongoose = require('mongoose');
const Fdb = require('./model/dbSchema');
const farmer = express();
require('./model/db');
const Farmer = require("./model/dbSchema");
const database = require("./routes/dbRoute");
const payment = require('./routes/paymentRoute');
const bcrypt = require('bcryptjs');
const port = process.env.PORT || 3000;
const jwt = require('jsonwebtoken');

farmer.use(express.json());
farmer.use("/farmer/signup" , database); 
farmer.use('/farmer/bank-data',payment);
//farmer home 
farmer.get("/farmer",(req,res)=>{
    res.send("hello from farmer");
});
farmer.post('/farmer/login',async (req,res)=>{
    try {
        const email = req.body.email;
        const pass = req.body.password;

    const user = await Farmer.findOne({email:email});
    const isMatch = await bcrypt.compare(pass, user.password);
    const token = await user.generateAuthToken();
    console.log(token); 
    if(isMatch){
        res.status(201).send('login succesfull');
    }else{
        res.send("invalide password");
    }
    } catch (error) {
        res.status(400).send("invalide emailId");
    }
  
})


//listning port
module.exports = farmer.listen(port);