const express = require('express');
const farmer = express();
require('./model/db');

const port = process.env.PORT || 3000;

farmer.get("/farmer",(req,res)=>{
    res.send("hello from farmer");
})




farmer.listen(3000);