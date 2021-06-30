const express = require('express');
const controller = require('../controller/cartController')
let router = express.Router();



router
/**
 * @swagger
 * /crop/view:
 *   get:
 *     responses:
 *       200:
 *         description: Returns all the crops
 */
    .route("/view/:id")
    .get(controller.getCart)


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
    .post(controller.postCart)

router.get('/:name',controller.cartName)
module.exports = router;