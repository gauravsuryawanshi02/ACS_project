const mongoose = require("mongoose");
const  mongoAtlasUri = "mongodb+srv://gaurav-cluster:cluster@619@mycluster.nov7s.mongodb.net/dealer?retryWrites=true&w=majority";

try {
    mongoose.connect( mongoAtlasUri, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true,useFindAndModify:false}, () =>
    console.log("connected"));    
    }catch (error) { 
    console.log("could not connect");    
    }