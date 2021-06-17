const express = require('express');
const farmer = express();
require('./model/db');

const port = process.env.PORT || 4000;

farmer.get("/admin",(req,res)=>{
    res.send("hello from admin again");
})




farmer.listen(port);