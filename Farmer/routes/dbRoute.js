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
    .post((req,res)=>{
      const user = new Farmer(req.body);
      user.save().then(()=>{
          res.send(user)
          console.log("working post");
      }).catch((err)=>{
          console.log(err);
      })
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
