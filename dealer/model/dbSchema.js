const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const dealerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique : true
  },
  password: {
    type: String,
    required: true
  },
  mobileNo:{
      type: Number,
      required:true
  },
  address:{
      state:{
        type:String,
        //required:true
      },
      city:{
        type:String,
        //required:true
      },
      street:{
        type:String,
        //required:true
      },
      pincode:{
        type:Number,
        //required:true
      }
  },
  tokens:[{
    token:{
      type:String,
      //required:true
    }
  }],  
}, { timestamps: true });

//generating token
dealerSchema.methods.generateAuthToken = async function(){
  try {
    //console.log(this.email);
    const token = jwt.sign({email:this.email},process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token});
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
}


//bcrypting
dealerSchema.pre('save',async function(next){
  if(this.isModified('password')){
  this.password = await  bcrypt.hash(this.password,10);
  }
  next();
})


const Dealer = mongoose.model('Dealer', dealerSchema);
module.exports = Dealer;
  