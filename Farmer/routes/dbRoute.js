const express = require('express');
const Farmer = require("../model/dbSchema");
let router = express.Router();

router
    .route("/")
    .get((req,res)=>{
        Farmer.find()
        .then(result => {
          res.send(result);
          console.log("working get");
        })
        .catch(err => {
          console.log(err);
        });
    })
    .post(async (req,res)=>{
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
      } catch (error) {
        console.log(error);
      }
   });

router
    .route('/:id')
    .get((req,res)=>{
      const _id = req.params.id; 
      Farmer.findById(_id)
      .then(result => {
          res.send(result);
      })
      .catch(err => {
          console.log(err);
      });
    })
    .patch((req,res)=>{
      const _id = req.params.id; 
      Farmer.findByIdAndUpdate(_id,req.body)
       .then(result => {
              res.send(result);
          })
          .catch(err => {
              console.log(err);
          });
    })
    .delete((req,res)=>{
      const _id = req.params.id; 
    Farmer.findByIdAndDelete(_id)
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log(err);
    });
    })


module.exports = router;
