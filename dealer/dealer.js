const express = require('express');
const dealer = express();
const Dealer = require("./model/dbSchema");
require('./model/db');
const database = require("./routes/router");
const bcrypt = require('bcryptjs');
const port = process.env.PORT || 5000;
const jwt = require('jsonwebtoken');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


dealer.use(express.json());

dealer.use("/dealer/signup" , database);
//dealer home 
dealer.get("/dealer",async(req,res)=>{
    try {
        res.send("hello from dealer");
    } catch (error) {
        res.status(404).send("invalide emailId");
    }
});

dealer.post('/dealer/login',async (req,res)=>{
    try {
        const email = req.body.email;
        const pass = req.body.password;

    const user = await Dealer.findOne({email:email});
    //bcrypt
    const isMatch = await bcrypt.compare(pass, user.password);
    //jwt
    const token = await user.generateAuthToken();
    //cookies
    res.cookie('jwt',token,{
        expires:new Date(Date.now()+30000),
        httpOnly:true
      });
    //console.log(token); 
    if(isMatch){
        res.status(201).send('login succesfull');
    }else{
        res.send("invalide password");
    }
    } catch (error) {
        res.status(400).send("invalide emailId");
    }
  
})
const options = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'Dealer API',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['./routes/*.js'],
};
dealer.use('/dealerapi', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
//listning port
module.exports= dealer.listen(port);