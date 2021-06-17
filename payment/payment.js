const express = require('express');
const farmer = express();


const port = process.env.PORT || 6000;

farmer.get("/payment",(req,res)=>{
    res.send("hello from payment");
})




farmer.listen(port);