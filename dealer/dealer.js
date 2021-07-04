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
const cors = require('cors');

dealer.use(cors());
dealer.use(express.json());
dealer.use(cookieParser())
dealer.use("/dealer" , database);
dealer.use("/dealer/login",login);

//dealer home 
// dealer.get("/home",async(req,res)=>{
//     try {
//         res.send("hello from dealer");
//     } catch (error) {
//         res.status(404).send("invalide emailId");
//     }
// });

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
    axios.get('http://localhost:3030/crop/view').then((response)=>{
        res.send(response.data)
    }).catch((error)=>{
        console.log(error);
    })
})

dealer.get('/crop/:name',auth,(req,res)=>{
    const name = req.params.name;
    axios.get('http://localhost:3030/crop/'+name).then((response)=>{
        res.send(response.data)
    }).catch((error)=>{
        console.log(error);
    })
})
dealer.post('/payment',(req,res)=>{
    axios.get('http://localhost:5555/payment',req.body).then((response)=>{
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
    },
    apis: ['./routes/*.js'],
};
dealer.use('/dealerdocs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
//listning port
module.exports= dealer.listen(port);