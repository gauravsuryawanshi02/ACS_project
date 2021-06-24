const Admin = require('../model/dbSchma');
const bcrypt = require('bcryptjs');

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

const postAdmin = async (req,res)=>{
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
//Login farmer
const loginAdmin = async (req,res)=>{
    try {
        const username = req.body.username;
        const pass = req.body.password;

    const user = await Admin.findOne({username:username});
    //bcrypt
    const isMatch = await bcrypt.compare(pass, user.password);
    //jwt
    const token = await user.generateAuthToken();


    console.log(token);
   
    //cookies
    res.cookie('jwt',token,{
        expires:new Date(Date.now()+600000),
        httpOnly:true
    });
    //console.log(token);
    
    if(isMatch){
        res.status(201).send('login succesfull');
    }else{
        res.send("invalide password");
    }
    } catch (error) {
        //res.status(400).send("invalide emailId");
        console.log(error);
    }
  
}

module.exports = {
    getAdmin,
    postAdmin,
    loginAdmin

}