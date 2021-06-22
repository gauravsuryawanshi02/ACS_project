const express = require('express');
const dealer = express();
const Dealer = require("./model/dbSchema");
require('./model/db');
const database = require("./routes/router");
const login = require("./routes/loginRoute");
//const bcrypt = require('bcryptjs');
const port = process.env.PORT || 5000;
// const jwt = require('jsonwebtoken');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


dealer.use(express.json());

dealer.use("/dealer/signup" , database);
dealer.use("/dealer/login",login);
//dealer home 
dealer.get("/dealer",async(req,res)=>{
    try {
        res.send("hello from dealer");
    } catch (error) {
        res.status(404).send("invalide emailId");
    }
});

//swagger
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