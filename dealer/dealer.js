const express = require('express');
const farmer = express();
require('./model/db');

const port = process.env.PORT || 5000;

farmer.get("/dealer",(req,res)=>{
    res.send("hello from dealer");
})




farmer.listen(port);