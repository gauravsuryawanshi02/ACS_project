const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  }  
}, { timestamps: true });

const Dealer = mongoose.model('Dealer', dealerSchema);
module.exports = Dealer;
  