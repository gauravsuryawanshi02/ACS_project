const jwt = require('jsonwebtoken');

const auth = async(req,res,next)=>{
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token,process.env.SECRET_KEY);
    //console.log(verifyUser);
    req.token = token;
    next();
  } catch (error) {
    res.status(404).send('login first');
  }
}
module.exports = auth;