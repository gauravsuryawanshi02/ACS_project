const express = require('express');
let router = express.Router();
const controller = require('../controller/adminControll');
const cookieParser = require('cookie-parser');
const adminAuth = require('../../middleware/authAdmin');

router.use(cookieParser());

router
    .route('/')
    .get(adminAuth,controller.getAdmin)
    .post(controller.postAdmin);


router
    .route('/login')
    .post(controller.loginAdmin)



module.exports = router;