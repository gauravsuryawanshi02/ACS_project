const express = require('express');
const axios = require('axios');
const { response } = require('express');
require('./model/db');
const Api = require('./model/dbSchema');
const bcrypt = require('bcryptjs');
const authApi = require('../middleware/authAdmin');
const cookieParser = require('cookie-parser');
const api = express();
const port = process.env.PORT || 7000;

api.use(express.json());
api.use(cookieParser());

//api home
api.get('/home',(req,res)=>{
    res.send('welcome to api gateway')
    console.log('in home');
})

//api register
api.post('/register',async (req,res)=>{
    try {
      const user = new Api(req.body);
      //pass bcrypt
      //json web token
      const token = await user.generateAuthToken();
      //cookies
      res.cookie('jwt',token,{
        expires:new Date(Date.now()+600000),
        httpOnly:true
    });
      
      //saving data to database
      await user.save();
      res.status(201).send(user)
      console.log("working post");
    }catch (error) {
        console.log(error);
    }    
})

//login api

api.post('/login', async (req,res)=>{
    try {
        const username = req.body.username;
        const pass = req.body.password;

    const user = await Api.findOne({username:username});
    //bcrypt
    const isMatch = await bcrypt.compare(pass, user.password);
    //jwt
    const token = await user.generateAuthToken();


    console.log(token);
   
    //cookies
    res.cookie('jwt',token,{
        expires:new Date(Date.now()+600000),
        httpOnly:true
    });
    //console.log(token);
    
    if(isMatch){
        res.status(201).send('login succesfull');
    }else{
        res.send("invalide password");
    }
    } catch (error) {
        //res.status(400).send("invalide emailId");
        console.log(error);
    }
  
})


//Get dealer
api.get('/dealer/data',authApi,(req,res)=>{
    axios.get('http://localhost:5000/dealer/signup').then((response)=>{
        res.send(response.data)
    }).catch((error)=>{
        console.log(error);
    })
})

//Get farmer
api.get('/farmer/data',authApi,(req,res)=>{
    axios.get('http://localhost:3000/farmer/signup').then((response)=>{
        res.send(response.data)
    }).catch((error)=>{
        console.log(error);
    })
})

//Get farmer by id
api.get('/farmer/data/:id',authApi,(req,res)=>{
    const id = req.params.id;
    axios.get('http://localhost:3000/farmer/signup/'+id).then((response)=>{
        res.send(response.data)
    }).catch((error)=>{
        console.log(error);
    })
})

//Get dealer by id
api.get('/dealer/data/:id',authApi,(req,res)=>{
    const id = req.params.id;
    axios.get('http://localhost:5000/dealer/signup/'+id).then((response)=>{
        res.send(response.data)
    }).catch((error)=>{
        console.log(error);
    })
})

//Post dealer
api.post('/dealer/add',authApi,(req,res)=>{
    axios.post('http://localhost:5000/dealer/signup',req.body).then((response)=>{
        res.send(response.data);
    })
})

//Post farmer
api.post('/farmer/add',authApi,(req,res)=>{
    axios.post('http://localhost:3000/farmer/signup',req.body).then((response)=>{
        res.send(response.data);
    })
})

//Patch farmer
api.patch('/farmer/update/:id',authApi,(req,res)=>{
    const id = req.params.id;
    axios.patch('http://localhost:3000/farmer/signup'+id,req.body).then((response)=>{
        res.send(response.data);
    })
})

//Patch dealer
api.patch('/dealer/update/:id',authApi,(req,res)=>{
    const id = req.params.id;
    axios.patch('http://localhost:5000/dealer/signup'+id,req.body).then((response)=>{
        res.send(response.data);
    })
})

//Delete farmer
api.delete('/farmer/delete/:id',authApi,(req,res)=>{
    const id = req.params.id;
    axios.patch('http://localhost:3000/farmer/signup'+id,req.body).then((response)=>{
        res.send(response.data);
    })
})

//Delete dealer
api.delete('/dealer/delete/:id',authApi,(req,res)=>{
    const id = req.params.id;
    axios.patch('http://localhost:5000/dealer/signup'+id,req.body).then((response)=>{
        res.send(response.data);
    })
})

//Get crop
api.get('/crop',authApi,(req,res)=>{
    axios.get('http://localhost:6000/crop/view').then((response)=>{
        res.send(response.data)
    }).catch((error)=>{
        console.log(error);
    })
})

//Post crop
api.post('/crop/add',authApi,(req,res)=>{
    axios.post('http://localhost:6000/crop/add',req.body).then((response)=>{
        res.send(response.data);
    })
})


api.listen(port,()=>{
    console.log(`listning to port ${port}`);
});