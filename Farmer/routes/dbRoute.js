const express = require('express');
let router = express.Router();
const controller = require('../controller/controller');
//const authJwt = require('../middleware/authJwt');
const cookieParser = require('cookie-parser');
const auth = require('../../middleware/authAdmin');

router.use(cookieParser());
router
/**
 * @swagger
 * /farmer/signup:
 *   get:
 *     responses:
 *       200:
 *         description: Returns all the dealers
 */
    .route("/")
    .get(auth,controller.getFarmer)
/**
 * @swagger
 * /farmer/signup:
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
    .post(auth,controller.postFarmer)

router
    .route('/:id')
/**
 * @swagger
 * /farmer/signup/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *     description: farmer get by id
 *     responses:
 *       200:
 *         description: Returns the requested dealer
 */
    .get(controller.getFarmerID)

    .patch(auth,controller.patchFarmer)
/**
 * @swagger
 * /farmer/signup/{id}:
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
    .delete(auth,controller.deleteFarmer)


module.exports = router;
