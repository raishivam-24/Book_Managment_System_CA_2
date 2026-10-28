require('dotenv').config()
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const bookroute=require('./router/bookRoute.js')
app.use(express.json())

const PORT=process.env.PORT||5050
mongoose.connect(process.env.MONGOOSE_URL||"mongodb://localhost:27017/")
.then(()=>{
    console.log("Database Connected")
})
.catch((err)=>{
    console.log("Database not Connected",err)
})
app.use('/',bookroute)

app.listen(PORT,()=>{
    console.log("server listening")
})