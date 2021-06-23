const jwt = require('jsonwebtoken');
const Farmer = require('../model/dbSchema');

const authAdmin = async(req,res,next)=>{
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token,process.env.SECRET_KEY1);
    //console.log(verifyUser);
    req.token = token;
    next();
  } catch (error) {
    res.status(404).send('login first');
  }
}
module.exports = authAdmin;