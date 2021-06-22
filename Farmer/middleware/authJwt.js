const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('login first');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.send('login first');
  }
};

module.exports = { requireAuth };