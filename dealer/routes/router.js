const express = require('express');
const controller = require('../controller/dealerControl'); 
let router = express.Router();
const auth  = require('../../middleware/authAdmin')



router
    .route("/signup")
/**
 * @swagger
 * /dealer/signup:
 *   get:
 *     responses:
 *       200:
 *         description: Returns all the dealers
 */
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
 *         description: Returns the requested dealer
 */
    .post(controller.postDealer)


//by id

router
    .route('/:id')
/**
 * @swagger
 * /dealer/{id}:
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
 * /dealer/{id}:
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



/**
 * @swagger
 * /dealer/home:
 *   get:
 *     responses:
 *       200:
 *         description: Returns all the dealers
 */
router.get('/home',async(req,res)=>{
    try {
        res.send("hello from dealer");
    } catch (error) {
        res.status(404).send("invalide emailId");
    }
});

//dealer cart
router.post('/addcart',auth,controller.addCart)
router.get('/getcart/:id',auth,controller.getCart)
router.get('/bill/:id',auth,controller.getBill)


module.exports = router;