const express = require('express');
const farmer = express();
require('./model/db');
const database = require("./routes/dbRoute");
const bankData = require('./routes/paymentRoute');
const login = require('./routes/loginRoute');
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const { default: axios } = require('axios');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

farmer.use(express.json());

farmer.use(cookieParser());



//farmer signup
farmer.use("/farmer/signup" , database); 

//farmer bank details
farmer.use('/farmer/bank-data',bankData);

//farmer login
farmer.use('/farmer/login',login);

farmer.get('/farmer/logout',async(req,res)=>{
    try {
        res.clearCookie('jwt');
        res.send('logout successfull');
    } catch (error) {
        console.log(error);
    }
})

farmer.get('/farmer/home', (req,res)=>{
    res.send('home');
    })
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
farmer.use('/farmerdocs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));


//listning port
module.exports = farmer.listen(port);