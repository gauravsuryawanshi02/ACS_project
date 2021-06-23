const express = require('express');
let loginRoute = express.Router();
const controller = require('../controller/controller');
const cookieParser = require('cookie-parser');

loginRoute.use(cookieParser());

loginRoute
    .route('/')
    .post(controller.loginFarmer)



module.exports = loginRoute;