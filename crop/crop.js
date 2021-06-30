const express = require('express');
const crop = express();
require('./model/db');
const cropRoute = require('./routes/router');
const cartRoute = require('./routes/cartRouter')
const port = process.env.PORT || 3030;
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


crop.use(express.json());

crop.use("/crop", cropRoute);

crop.use('/cart',cartRoute)

crop.get('/crop/home',(req,res)=>{
    res.send('in crop home');
})


//swagger
const options = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'crop API',
        },
        servers: [
            {
                url: `http://localhost:3030`,
            },
        ],
    },
    apis: ['./routes/*.js'],
};
crop.use('/cropapi', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
//listning port
module.exports= crop.listen(port);