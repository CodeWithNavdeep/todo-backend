import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app  = express()
 app.use(express.json())
 app.use(express.urlencoded())
 app.use(cors())

 mongoose.connect('mongodb+srv://Aryan:Aryan2002@cluster0.abbrk6a.mongodb.net/tododbs?retryWrites=true&w=majority', {//yahaaan
    useNewUrlParser: true,
    useUnifiedTopology: true
 }, ()=>{
    console.log("DB connected");
 })

 const userSchema = new mongoose.Schema({
    email: String,
    password: String
 })

const User = new mongoose.model("User", userSchema)

 app.post("/login",(req, res) =>{
   const{email, password} = req.body
   User.findOne({email:email}, (err,user)=>{
      if(user){
         if(password === user.password){
            res.send({message:"Login Successful", user:user})
         }else{
            res.send({message:"password did not match"})
         }
      }else{
         res.send({message:"User not registered please register first"})
      }
   })
 } )

 app.post("/register", (req,res)=>{
   const {email, password} = req.body
   User.findOne({email: email}, (err, user)=>{
      if(user){
         res.send({message:"Email already regeistered"})
      }
      else{
         const user = new User({
            email,
            password
         })
         user.save(err=>{
            if(err){
               res.send({err})
            }else {
               res.send({message: "successfully Registered"})
            }
         })
      }
   })
 
 })
 app.listen(8080, ()=>{
    console.log("BE started at port 8080")
 })