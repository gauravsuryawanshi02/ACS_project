const express = require('express');
const mongoose = require('mongoose');
const Farmer = require("../model/dbSchema");
let payment = express.Router();

payment
    .route('/')
    .get((req,res)=>{
         Farmer.aggregate([
           {$group: {_id:"$netBanking"}}])
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
    })

//CRUD by id
payment
    .route('/:id')
    .get((req,res)=>{
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
    })
    .delete((req,res)=>{
        const id = req.params.id; 
    
        Farmer.aggregate([{
            $match: { _id: new mongoose.Types.ObjectId(id) }
          },{ $unset: ["netBanking"]}],)
        .then(result => {
            res.send(result);
            console.log('unset');
        })
        .catch(err => {
            console.log(err);
        });
    })

module.exports = payment;