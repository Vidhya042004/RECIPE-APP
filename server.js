const express=require('express')
const mongoose=require('mongoose')
const app=express()
const PORT=3000
require('dotenv').config()
const User=require('./models/User')
const bcrypt=require('bcryptjs')





mongoose.connect(process.env.MONGO_URL).then(
    ()=>console.log("DB connected successfully")
).catch(
    (err)=>console.log(err)
)
app.use(express.json());


app.get('/',async(req,res)=>{
    try{
        res.send("<h2 style='color:black;text-align:center'>Welcome to the MERN Stack | Week 2 | Backend</h2>")
    }
    catch(err)
    {
        console.log(err)
    }
})



app.post('/register',async(req,res)=>{
    const {username,email,password}=req.body
    try{
        const hashPassword=await bcrypt.hash(password,10)
        const newUser=new User({username,email,password:hashPassword})
        await newUser.save()
        console.log("New user is created....")
        res.json({message: "User Registred.."})
    }
    catch(err)
    {
        console.log(err)
    }
})

app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) 
            {
             return res.status(400).json({ message: "Invalid Credentials" });
            }
          res.json({ message: "Login Successful", username: user.username });

    }
    catch(err)
    {
        console.log(err)
    }
})


app.listen(PORT,(err)=>{
    if(err)
    {
        console.log(err)
    }
    console.log("Server is running on port :"+PORT)
})