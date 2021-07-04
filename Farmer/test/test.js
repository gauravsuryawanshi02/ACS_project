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
describe('Get /farmer', () => {
    it('it should get all data', (done) => {
        chai.request(farmer)
            .get('/farmer/signup')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                done();
            })
    })
    it('it should not get all data', (done) => {
        chai.request(farmer)
            .get('/farmer/sign')
            .end((err, response) => {
                response.should.have.status(404);
                done();
            })
    })
})
//get by id
describe('Get /farmer', () => {
    it('it should get by id', (done) => {
        id = '60cd73d2d833aa0cb44516ea';
        chai.request(farmer)
            .get('/farmer/signup/' + id)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();
            })
    })
    it('it should not get by id', (done) => {
        id = '60cd73d2d833aa0cb44516ea';
        chai.request(farmer)
            .get('/farmer/sign/' + id)
            .end((err, response) => {
                response.should.have.status(404);
                done();
            })
    })
})
// //post farmer 
// describe('post /farmer/signup',()=>{
//     it('it should post data',(done)=>{
//         user = {
//             name:"farmer19",
//             email:"farmer19@gmail.com",
//             password:"qwerty",
//             mobileNo:"123456789"
//         }
//         chai.request(farmer)
//         .post('/farmer/signup')
//         .send(user)
//         .end((err,response)=>{
//             response.should.have.status(201);
//             response.body.should.be.a('object');
//         done();
//         })
//     })
//     it('it should not post data',(done)=>{
//         user = {
//             name:"farmer19",
//             email:"farmer19@gmail.com",
//             password:"qwerty",
//             mobileNo:"123456789"
//         }
//         chai.request(farmer)
//         .post('/farmer/signup')
//         .send(user)
//         .end((err,response)=>{
//             response.should.have.status(201);
//             response.body.should.be.a('object');
//         done();
//         })
//     })
// }) 
//patch
describe('patch /farmer/signup', () => {
    it('it should patch data', (done) => {
        user = {
            name: "gaurav13",
        }
        id = '60cd73d2d833aa0cb44516ea';
        chai.request(farmer)
            .patch('/farmer/signup/' + id)
            .send(user)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');

                done();
            })
    })
    it('it should not patch data', (done) => {
        user = {
            name: "gaurav13",
        }
        id = '60cd73d2d833aa0cb44516ea';
        chai.request(farmer)
            .patch('/farmer/sigp/' + id)
            .send(user)
            .end((err, response) => {
                response.should.have.status(404);

                done();
            })
    })
})
//delete
describe('delete /farmer/signup', () => {
    it('it should delete data', (done) => {
        id = '60cd73d2d833aa0cb44516ea';
        chai.request(farmer)
            .delete('/farmer/signup/' + id)
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
    })
    it('it should not delete data', (done) => {
        id = '60cd73d2d833aa0cb44516ea';
        chai.request(farmer)
            .delete('/farmer/sigup/' + id)
            .end((err, response) => {
                response.should.have.status(404);
                done();
            })
    })
})