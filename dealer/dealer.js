const express = require('express');
const dealer = express();
require('./model/db');
const Dealer = require("./model/dbSchema");

const port = process.env.PORT || 5000;
dealer.use(express.json());

dealer.get("/dealer",(req,res)=>{
    res.send("hello from dealer");
});

dealer.get("/dealer/database",(req,res)=>{
    Dealer.find()
        .then(result => {
          res.send(result);
          console.log("working get");
        })
        .catch(err => {
          console.log(err);
        });
});
dealer.post("/dealer/database",(req,res)=>{
     //console.log(req.body);
    const user = new Dealer(req.body);
    
      user.save()
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          console.log(err);
        });
});
dealer.get("/dealer/database/:id",(req,res)=>{
  const _id = req.params.id; 
  Dealer.findById(_id)
  .then(result => {
      res.send(result);
  })
  .catch(err => {
      console.log(err);
  });
});
dealer.patch("/dealer/database/:id",(req,res)=>{
  const _id = req.params.id; 
  Dealer.findByIdAndUpdate(_id,req.body)
   .then(result => {
          res.send(result);
      })
      .catch(err => {
          console.log(err);
      });
});
dealer.delete("/dealer/database/:id",(req,res)=>{
  const _id = req.params.id; 
    Dealer.findByIdAndDelete(_id)
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log(err);
    });
});




dealer.listen(port);