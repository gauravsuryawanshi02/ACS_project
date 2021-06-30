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
const axios = require ('axios');
const auth = require('../middleware/authAdmin');
const cookieParser = require('cookie-parser');


dealer.use(express.json());
dealer.use(cookieParser())
dealer.use("/dealer/signup" , database);
dealer.use("/dealer/login",login);

//dealer home 
dealer.get("/",async(req,res)=>{
    try {
        res.send("hello from dealer");
    } catch (error) {
        res.status(404).send("invalide emailId");
    }
});

dealer.get('/logout',async(req,res)=>{
    try {
        res.clearCookie('jwt');
        res.send('logout successfull');
    } catch (error) {
        console.log(error);
    }
})

dealer.get('/farmer/:id',auth,(req,res)=>{
    const id = req.params.id;
    axios.get('http://localhost:3000/farmer/signup/'+id).then((response)=>{
        res.send(response.data)
    }).catch((error)=>{
        console.log(error);
    })
})

dealer.get('/crop',auth,(req,res)=>{
    axios.get('http://localhost:8000/crop').then((response)=>{
        res.send(response.data)
    }).catch((error)=>{
        console.log(error);
    })
})

dealer.get('/crop/:name',auth,(req,res)=>{
    const name = req.params.name;
    axios.get('http://localhost:8000/crop/'+name).then((response)=>{
        res.send(response.data)
    }).catch((error)=>{
        console.log(error);
    })
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
dealer.use('/dealerapi', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
//listning port
module.exports= dealer.listen(port);