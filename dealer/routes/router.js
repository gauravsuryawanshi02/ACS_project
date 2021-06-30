const express = require('express');
const controller = require('../controller/dealerControl'); 
let router = express.Router();
const auth  = require('../../middleware/authAdmin')



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
    .get(auth,controller.getDealer)
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
 *         description: Returns the requested dealer
 */
    .post(auth,controller.postDealer)

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
    .get(auth,controller.getDealerId)
    .patch(auth,controller.patchDealer)

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

    .delete(auth,controller.deleteDealer)


router.post('/addcart',auth,controller.addCart)
router.get('/getcart/:id',auth,controller.getCart)


module.exports = router;