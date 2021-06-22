const express = require('express');
const controller = require('../controller/dealerControl'); 
let loginRoute = express.Router();

loginRoute
    .route('/')
    .post(controller.loginDealer)



    module.exports = loginRoute;