const Crop = require("../model/dbSchema");


const getCrop = (req,res) =>{
    Crop.find().sort({"createdAt":-1})
        .then(result => {
          res.send(result);
          console.log("working get");
        })
        .catch(err => {
          res.status(400).send("page not found");
    });
}

const postCrop = async (req,res)=>{
    try {
      const user = new Crop(req.body);
      //saving data to database
      await user.save();
      res.status(201).send(user)
      console.log("working post");
    } catch (err) {
      console.log(err);
    }
}

module.exports = {
    getCrop,
    postCrop
}