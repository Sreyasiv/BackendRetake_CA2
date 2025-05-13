const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()


const PORT=8001;

const User=require('./UserSchema')
const app=express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('MongoDB connected'))
    .catch(()=>console.log('Error in connecting to DB'))

app.post('/post',async(req,res)=>{

    try{
       const{username,email,password,dob}=req.body

    if(!username || !email || !password){
        return res.status(400).json({message:"All fields are required"})
    }
    if(username.length===0){
        return res.status(400).json({message:"Username cannot be empty"})
    }
    if(email.length===0){
        return res.status(400).json({message:"Email cannot be empty"})
    }
    if(password.length<8 || password.length>16){
        return res.status(400).json({message:"The password length should be lesser than or equal to 16 and more than 8"})
    }

    await User.req.body.save()
    return res.status(201).json({message:"User registed",user:newUser})
    }

    catch{
        return res.status(500).json({message:"Internal server Error"})
    }

})


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})