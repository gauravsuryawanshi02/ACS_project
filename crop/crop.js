const express = require('express');
const crop = express();
require('./model/db');
const cropRoute = require('./routes/router');
const port = process.env.PORT || 6000;
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


crop.use(express.json());

crop.use("/crop", cropRoute);

crop.get('/crop/home',(req,res)=>{
    res.send('in crop home');
})


// //swagger
// const options = {
//     definition: {
//         openapi: '3.0.3',
//         info: {
//             title: 'crop API',
//         },
//         servers: [
//             {
//                 url: `http://localhost:6000`,
//             },
//         ],
//     },
//     apis: ['./routes/*.js'],
// };
// crop.use('/cropapi', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
//listning port
module.exports= crop.listen(port);