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
    .patch((req,res)=>{
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
    })

module.exports = payment;