const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Schema
const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});




adminSchema.methods.generateAuthToken = async function(){
    try {
      //console.log(this.email);
      const token = jwt.sign({username:this.username},'hello From Admin of Project');
      //this.tokens = this.tokens.concat({token});
      //await this.save();
      return token;
    } catch (error) {
      console.log(error);
    }
}
  
  
  //bcrypting
adminSchema.pre('save',async function(next){
    if(this.isModified('password')){
    this.password = await  bcrypt.hash(this.password,10);
    }
    next();
})

const Adb = mongoose.model('Admin', adminSchema);
module.exports = Adb;