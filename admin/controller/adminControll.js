const Admin = require('../model/dbSchma');
//const bcrypt = require('bcryptjs');

const handleError = (err) =>{
    let errors = {email:'',password:''}
    //validation

    if(err.message.includes('Dealer validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message;
        });
    }
    return errors;
}

const  getAdmin = (req,res) => {
    Admin.find().sort({"createdAt":-1})
        .then(result => {
          res.send(result);
          console.log("working get");
        })
        .catch(err => {
          res.status(400).send("page not found");
    });
}

const loginAdmin = async (req,res)=>{
    try {
      const user = new Admin(req.body);
      //pass bcrypt
      //json web token
      const token = await user.generateAuthToken();
      //cookies
      res.cookie('jwt',token,{
        expires:new Date(Date.now()+600000),
        httpOnly:true
    });
      
      //saving data to database
      await user.save();
      res.status(201).send(user)
      console.log("working post");
    }catch (error) {
        console.log(error);
    }

}

module.exports = {
    getAdmin,
    loginAdmin

}