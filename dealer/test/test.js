const chai = require('chai');
const chaiHttp = require('chai-http');
const dealer = require('../dealer');
//const database = require("../routes/dbRoute");
var assert = require("assert");


chai.should(); 
// expect
// assert
chai.use(chaiHttp);


//get farmer
describe('Get /dealer',()=>{
    it('it should get all data',(done)=>{
        chai.request(dealer)
        .get('/dealer/signup')
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('array');
        done();
        })
    })
    it('it should not get all data',(done)=>{
        chai.request(dealer)
        .get('/dealer/signu')
        .end((err,response)=>{
            response.should.have.status(400);
            //response.body.should.be.a('array');
        done();
        })
    })
})
//get by id
describe('Get /dealer',()=>{
    it('it should get by id',(done)=>{
        id = '60dea67b3acd4a333014cfc7';
        chai.request(dealer)
        .get('/dealer/'+id)
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
        done();
        })
    })
    it('it should  not get by id',(done)=>{
        id = '60cd73d2d833aa0cb44516ea';
        chai.request(dealer)
        .get('/dealer/signu/'+id)
        .end((err,response)=>{
            response.should.have.status(404);
            //response.body.should.be.a('object');
        done();
        })
    })
})
// //post farmer 
// describe('post /dealer/signup',()=>{
//     it('it should post data',(done)=>{
//         user = {
//             name:"dealer19",
//             email:"dealer19@gmail.com",
//             password:"qwerty",
//             mobileNo:"123456789"
//         }
//         chai.request(dealer)
//         .post('/dealer/signup')
//         .send(user)
//         .end((err,response)=>{
//             response.should.have.status(201);
//             response.body.should.be.a('object');
//         done();
//         })
//     })
// }) 
//patch
describe('patch /dealer/signup',()=>{
    it('it should patch data',(done)=>{
        user = {
            name:"gaurav13",
        }
        id = '60dea67b3acd4a333014cfc7';
        chai.request(dealer)
        .patch('/dealer/'+id)
        .send(user)
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
            
        done();
        })
    })
    it('it should not patch data',(done)=>{
        user = {
            name:"gaurav13",
        }
        id = '60dea67b3acd4a333014cfc7';
        chai.request(dealer)
        .patch('/dealer/signu/'+id)
        .send(user)
        .end((err,response)=>{
            response.should.have.status(404);
            //response.body.should.be.a('object');
            
        done();
        })
    })
 }) 
//delete
describe('delete /dealer/signup',()=>{
    it('it should delete data',(done)=>{
        id = '60dea67b3acd4a333014cfc7';
        chai.request(dealer)
        .delete('/dealer/'+id)
        .end((err,response)=>{
            response.should.have.status(200);
        done();
        })
    })
    it('it should delete data',(done)=>{
        id = '60cd73d2d833aa0cb44516ea';
        chai.request(dealer)
        .delete('/dealer/sign/'+id)
        .end((err,response)=>{
            response.should.have.status(404);
        done();
        })
    })
}) 

//crop
 