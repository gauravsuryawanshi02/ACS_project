const express = require('express');
const controller = require('../controller/dealerControl');
let loginRoute = express.Router();

loginRoute
    .route('/')
/**
 * @swagger
 * /dealer/login:
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
    .post(controller.loginDealer)



module.exports = loginRoute;