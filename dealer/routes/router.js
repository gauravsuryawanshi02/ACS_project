const express = require('express');
const controller = require('../controller/dealerControl'); 
let router = express.Router();



router
/**
 * @swagger
 * /dealer/signup:
 *   get:
 *     responses:
 *       200:
 *         description: Returns all the dealers
 */
    .route("/")
    .get(controller.getDealer)
/**
 * @swagger
 * /dealer/signup:
 *   post:
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object                      
 *     responses:
 *       200:
 *         description: Returns the requested admin
 */
    .post(controller.postDealer)

router
    .route('/:id')
/**
 * @swagger
 * /dealer/signup/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *     description: dealer get by id
 *     responses:
 *       200:
 *         description: Returns the requested dealer
 */
    .get(controller.getDealerId)
    .patch(controller.patchDealer)

/**
 * @swagger
 * /dealer/signup/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *     description: dealer deleted
 *     responses:
 *       200:
 *         description: Returns the requested dealer
 */

    .delete(controller.deleteDealer)


module.exports = router;