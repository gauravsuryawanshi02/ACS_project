const express = require('express');
let router = express.Router();
const controller = require('../controller/controller');

router
    .route("/")
    .get(controller.getFarmer)
    .post(controller.postFarmer)

router
    .route('/:id')
    .get(controller.getFarmerID)
    .patch(controller.patchFarmer)
    .delete(controller.deleteFarmer)


module.exports = router;
