const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cropSchema = new Schema({
  name: {
    type: String,
    required: [true, 'please enter name'],
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