const express = require('express');
const Dealer = require("../model/dbSchema");
let router = express.Router();

router
    .route("/")
    .get((req,res)=>{
        Dealer.find()
        .then(result => {
          res.send(result);
          console.log("working get");
        })
        .catch(err => {
          res.status(400).send("page not found");
        });
    })
    .post(async (req,res)=>{
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
      } catch (error) {
        console.log(error);
      }
    });

router
    .route('/:id')
    .get((req,res)=>{
      const _id = req.params.id; 
      Dealer.findById(_id)
      .then(result => {
          res.send(result);
      })
      .catch(err => {
        res.status(400).send("page not found");
      });
    })
    .patch((req,res)=>{
      const _id = req.params.id; 
      Dealer.findByIdAndUpdate(_id,req.body)
       .then(result => {
              res.send(result);
          })
          .catch(err => {
            res.status(400).send("page not found");
          });
    })
    .delete((req,res)=>{
      const _id = req.params.id; 
      Dealer.findByIdAndDelete(_id)
    .then(result => {
        res.send(result);
    })
    .catch(err => {
      res.status(400).send("page not found");
    });
    })


module.exports = router;