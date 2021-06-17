const express = require('express');
const mongoose = require('mongoose');
const Fdb = require('./model/dbSchema');
const farmer = express();
require('./model/db');
const Farmer = require("./model/dbSchema");
const database = require("./routes/dbRoute");
const payment = require('./routes/paymentRoute');
const port = process.env.PORT || 3000;

farmer.use(express.json());
farmer.use("/farmer/database" , database);
farmer.use('/farmer/payment',payment);
//farmer home 
farmer.get("/farmer",(req,res)=>{
    res.send("hello from farmer");
});



//listning port
farmer.listen(port);