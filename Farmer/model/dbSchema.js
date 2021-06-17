const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const farmerSchema = new Schema({
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
  crop:{
    name:{
        type:String,
        //required:true
    },
    quantity:{
        type:Number,
        //required:true
    }
  },
  netBanking:{
      bankName:{
        type:String,
        //required:true
      },
      accNo:{
        type:Number,
        //required:true
      },
      IFSCcode:{
        type:Number,
        //required:true
      }
  },
  upi:{
    type:String,
    //required:true
  },
}, { timestamps: true });

const Fdb = mongoose.model('Farmer', farmerSchema);
module.exports = Fdb;


