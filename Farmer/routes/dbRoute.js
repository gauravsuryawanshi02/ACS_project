const express = require('express');
let router = express.Router();
const controller = require('../controller/controller');
//const authJwt = require('../middleware/authJwt');
const cookieParser = require('cookie-parser');
const auth = require('../middleware/authJwt');

router.use(cookieParser());
router
    .route("/")
    .get(auth,controller.getFarmer)
    .post(controller.postFarmer)

router
    .route('/:id')
    .get(auth,controller.getFarmerID) 
    .patch(auth,controller.patchFarmer)
    .delete(auth,controller.deleteFarmer)


module.exports = router;
