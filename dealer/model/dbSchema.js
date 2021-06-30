const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {isEmail} = require('validator');

const dealerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'please enter name'],
  },
  email: {
    type: String,
    required: [true, 'please enter name'],
    unique : [true, 'enter different email'],
    lowercase : true,
    validate : [isEmail,'please enter valid email']
  },
  password: {
    type: String,
    required: [true, 'please enter name'],
    minlength: [6,'password should consist more than 6 character']
  },
  mobileNo:{
      type: Number,
      required:[true, 'please enter name'],
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
  orders: {
		type: Array,
		required: true
	
  },  
}, { timestamps: true });

//generating token
dealerSchema.methods.generateAuthToken = async function(){
  try {
    //console.log(this.email);
    const token = jwt.sign({email:this.email},process.env.SECRET_KEY);
    //this.tokens = this.tokens.concat({token});
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
  