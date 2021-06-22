const express = require('express');
let loginRoute = express.Router();
const controller = require('../controller/controller');

loginRoute
    .route('/')
    .post(controller.loginFarmer)



module.exports = loginRoute;