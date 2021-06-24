const express = require('express');
let router = express.Router();
const controller = require('../controller/controller');
//const authJwt = require('../middleware/authJwt');
const cookieParser = require('cookie-parser');
const auth = require('../middleware/authJwt');
const authAdmin = require('../../middleware/authAdmin');

router.use(cookieParser());
router
    .route("/")
    .get(controller.getFarmer)
    .post(controller.postFarmer)

router
    .route('/:id')
    .get(controller.getFarmerID) 
    .patch(authAdmin,controller.patchFarmer)
    .delete(authAdmin,controller.deleteFarmer)


module.exports = router;
