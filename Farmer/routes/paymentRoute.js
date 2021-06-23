const express = require('express');
let bankData = express.Router();
const controller = require('../controller/controller');

bankData
    .route('/')
    .get(controller.getBankData)

//CRUD by id
bankData
    .route('/:id')
    .get(controller.getBankDataID)
    .patch(controller.patchBank)

module.exports = bankData;