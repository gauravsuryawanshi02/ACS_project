const express = require('express');
let loginRoute = express.Router();
const controller = require('../controller/controller');
const cookieParser = require('cookie-parser');

loginRoute.use(cookieParser());

loginRoute
    .route('/')
    /**
 * @swagger
 * /farmer/login:
 *   post:
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object                      
 *     responses:
 *       200:
 *         description: Returns the requested dealer
 */
    .post(controller.loginFarmer)



module.exports = loginRoute;