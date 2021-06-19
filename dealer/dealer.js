const express = require('express');
const dealer = express();
require('./model/db');
const database = require("./routes/router");
const port = process.env.PORT || 5000;

dealer.use(express.json());
dealer.use("/dealer/database" , database);

//farmer home 
dealer.get("/dealer",(req,res)=>{
    res.send("hello from dealer");
});



//listning port
dealer.listen(port);