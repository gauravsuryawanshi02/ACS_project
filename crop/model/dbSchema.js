const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cropSchema = new Schema({
  name: {
    type: String,
    required: [true, 'please enter name'],
  },
  customerid:{
    type: mongoose.SchemaTypes.ObjectId,
    //required: [true,'enter customer id']
  },
  Crop_Type: {
    type: String,
    trim: true,
    //required: [true, 'enter crop_type']
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

const crop = mongoose.model('Crop', cropSchema);
module.exports = crop;