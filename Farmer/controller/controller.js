const Farmer = require("../model/dbSchema");
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const axios = require('axios');

//error handling
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

//get all farmer details
const getFarmer = (req,res)=>{

    Farmer.find()
    .then(result => {
      res.send(result);
      console.log("working get");
    })
    .catch(err => {
      console.log(err);
    });
}

//post farmer
const postFarmer = async (req,res)=>{
    try {
      const user = new Farmer(req.body);
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
    }catch (err) {
        const errors = handleError(err);
        res.status(400).json({errors});
    }
}

//Get one farmer details
const getFarmerID = (req,res)=>{
    const _id = req.params.id; 
    Farmer.findById(_id)
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log(err);
    });
}

//Patch farmer 
const patchFarmer = (req,res)=>{
    const _id = req.params.id; 
    Farmer.findByIdAndUpdate(_id,req.body)
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log(err);
    });
}

//Delete farmer
const deleteFarmer = (req,res)=>{
    const _id = req.params.id; 
    Farmer.findByIdAndDelete(_id)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
}

////Get farmer bank details
const getBankData = (req,res)=>{
    Farmer.aggregate([
      {$group: {_id:"$netBanking"}}])
   .then(result => {
       res.send(result);
   })
   .catch(err => {
       console.log(err);
   });
}

//Get one farmer bank details
const getBankDataID = (req,res)=>{
    const id = req.params.id; 

    Farmer.aggregate([{
        $match: { _id: new mongoose.Types.ObjectId(id) }
      },{$group: {_id:"$netBanking"}}])
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log(err);
    });
}

//Patch farmer bank details
const patchBank = (req,res)=>{
    const _id = req.params.id; 
    Farmer.updateOne(
        { _id: _id },
        { $set: { "netBanking": req.body } }
     ) .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log(err);
    });
}

//Login farmer
const loginFarmer = async (req,res)=>{
    try {
        const email = req.body.email;
        const pass = req.body.password;

    const user = await Farmer.findOne({email:email});
    //bcrypt
    const isMatch = await bcrypt.compare(pass, user.password);
    //jwt
    const token = await user.generateAuthToken();
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

const addCrop = async (req, res) => {
    try {
      const cropResponse = await axios.post("http://localhost:3030/crop/add", req.body)
      //console.log(cropResponse.data);
      if (cropResponse.status === 201) {
        Farmer.findById(req.body.customerid, (err, user) => {
          //console.log(cropResponse.data._id);
          user.crops.push(cropResponse.data._id)
          user.save().then(() => {
            //console.log(result.data);
            res.send(`Crop created `)
          }).catch((err) => {
            //console.log(err.message)
            res.send("failed to add crop")
          })
        })
      }
    } catch (err) {
      console.log(err);
    }
  }


//export controller
module.exports = {
   getFarmer,
   postFarmer,
   getFarmerID,
   patchFarmer,
   deleteFarmer,
   getBankData,
   getBankDataID,
   patchBank,
   loginFarmer,
   addCrop
}