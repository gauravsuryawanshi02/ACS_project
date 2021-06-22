const Dealer = require("../model/dbSchema");
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

const getDealer = (req,res) =>{
    Dealer.find().sort({"createdAt":-1})
        .then(result => {
          res.send(result);
          console.log("working get");
        })
        .catch(err => {
          res.status(400).send("page not found");
    });
}
const postDealer = async (req,res)=>{
    try {
      const user = new Dealer(req.body);
      //pass bcrypt
      //json web token
      const token = await user.generateAuthToken();
      //cookies
      res.cookie('jwt',token,{
        expires:new Date(Date.now()+30000),
        httpOnly:true
      });
      
      //saving data to database
      await user.save();
      res.status(201).send(user)
      console.log("working post");
    } catch (err) {
      const errors = handleError(err);
      res.status(400).json({errors});
    }
}
const getDealerId = (req,res)=>{
    const _id = req.params.id;
    Dealer.findById(_id)
    .then(result => {
        res.send(result);
    })
    .catch(err => {
    res.status(400).send("page not found");
    });
    
}
const patchDealer = (req,res)=>{
    const _id = req.params.id; 
    Dealer.findByIdAndUpdate(_id,req.body)
     .then(result => {
            res.send(result);
        })
        .catch(err => {
          res.status(400).send("page not found");
        });
}
const deleteDealer = (req,res)=>{
    const _id = req.params.id; 
    Dealer.findByIdAndDelete(_id)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
    res.status(400).send("page not found");
    });
}

const loginDealer = async (req,res)=>{
  try {
      const email = req.body.email;
      const pass = req.body.password;

  const user = await Dealer.findOne({email:email});
  //bcrypt
  const isMatch = await bcrypt.compare(pass, user.password);
  //jwt
  const token = await user.generateAuthToken();
  //cookies
  res.cookie('jwt',token,{
      expires:new Date(Date.now()+30000),
      httpOnly:true
    });
  //console.log(token); 
  if(isMatch){
      res.status(201).send('login succesfull');
  }else{
      res.send("invalide password");
  }
  } catch (error) {
      res.status(400).send("invalide emailId");
    }

}


module.exports = {
    getDealer,
    postDealer,
    getDealerId,
    patchDealer,
    deleteDealer,
    loginDealer
}