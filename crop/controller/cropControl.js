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

const cropName = async (req,res)=>{
  try{
    const name = req.params.name;
    const query = {"name":name}

    Crop.find(query)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(400).send("page not found");
    });
  }catch(err){
    console.log(err);
  }
}

const deleteCrop = (req, res) => {
  Crop.findByIdAndRemove(req.params.id)
      .then((result) => {
          res.status(200).send(result);
      })
      .catch((err) => {
          res.status(400).send("not done");
      })
};

module.exports = {
    getCrop,
    postCrop,
    deleteCrop,
    cropName
}