const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const farmer = require('../app');
//const database = require("../routes/dbRoute");

chai.should(); 
// expect
// assert
chai.use(chaiHttp);


//get farmer
describe('Get /farmer',()=>{
    it('it should get all data',(done)=>{
        chai.request(farmer)
        .get('/farmer/database')
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('array');
        done();
        })
    })
})

//post farmer by id
// describe('Get /farmer',()=>{
//     it('it should post data',(done)=>{
//        chai.request(farmer)
//         .post('/farmer/database',(req,res)=>{
//             user.save();
//         })
        
//         .end((err,response)=>{
//             response.should.have.status(201);
//             response.body.should.be.a('object');
//         done();
//         })
//     })
// })      
//     const id = "60cb122864e25f46ec4be1c8"
//     .get('/farmer/database/'+id)
 