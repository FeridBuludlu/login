const express = require('express')
const app = express()
const cors = require("cors")
const userModel = require("./models/User.model")
require("dotenv").config()
const mongoose = require("mongoose")


app.post("/register",(req,res)=>{
    userModel.create({...req.body})
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
})

app.post("/login",(req,res)=>{
    const {email,password} = req.body;
    userModel.findOne({email,password}).then(user=>{
        if(user){
            if(user.password===password){
                res.json("success")
            }else{
                res.json("is nor correct password")
            }
        }else{
            res.json("user not exist")
        }
  });
});











app.use(express.json())
app.use(cors())

app.listen(process.env.PORT, () => {
    console.log(`CONNECTED ${process.env.PORT}`)
})
mongoose.connect(process.env.CONNECTION_STRING)
 .then(() => console.log(`connecteddd`))