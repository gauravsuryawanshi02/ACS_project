const express = require('express');
const admin = express();
require('./model/db');
const cookieParser = require('cookie-parser');
const adminRoute = require('./router/adminRoute');

const port = process.env.PORT || 4000;

admin.use(express.json());

admin.use(cookieParser());
admin.use('/admin',adminRoute);




admin.listen(port);