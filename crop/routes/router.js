const express = require('express');
const controller = require('../controller/cropControl'); 
let router = express.Router();



router
/**
 * @swagger
 * /dealer/signup:
 *   get:
 *     responses:
 *       200:
 *         description: Returns all the crops
 */
    .route("/view")
    .get(controller.getCrop)


router
    
/**
 * @swagger
 * /crop/add:
 *   post:
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object                      
 *     responses:
 *       200:
 *         description: Returns the requested crop
 */
    .route('/add')
    .post(controller.postCrop)


module.exports = router;