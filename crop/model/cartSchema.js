const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cartSchema = new Schema({
  name: {
    type: String,
    required: [true, 'please enter name'],
  },
  customerid:{
    type: mongoose.SchemaTypes.ObjectId,
    //required: [true,'enter customer id']
  },
  quantity:{
      type : Number,
      required : true
  },
  price:{
      type : Number,
      required : true
  }  
})

const cart = mongoose.model('Cart', cartSchema);
module.exports = cart;