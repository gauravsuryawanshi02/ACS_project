const express = require('express');
let router = express.Router();
const controller = require('../controller/adminControll');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router
    .route('/')
    .get(controller.getAdmin)
    .post(controller.loginAdmin)



module.exports = router;