const jwt = require('jsonwebtoken');
const express = require('express');
const auth = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();

auth.use(cookieParser());

const authAdmin = async(req,res,next)=>{
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token,process.env.SECRET_KEY);
    //console.log(verifyUser);
    req.token = token;
    next();
  } catch (error) {
    //res.status(404).send('Access is only valid for admin');
    console.log(error);
  }
}
module.exports = authAdmin;