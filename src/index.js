

const express=require('express')
const app=express()
const {default: mongoose} =require('mongoose')
const router=require('./Router/Routes')
const cors=require('cors')
const multer=require('multer')
const {GridFsStorage}=require('multer-gridfs-storage')





app.use(express.json())

app.use(cors())


  mongoose.connect(`mongodb+srv://RahulChaudhary:Rahul321@cluster1.42h1ws9.mongodb.net/WhatsApp_Clone?retryWrites=true&w=majority`)
   .then(()=>{
    console.log("MongoDB is connected")
   
})
.catch((err)=>console.log(err.message))



app.use("/",router)


app.listen(process.env.PORT ||5000 , function (){
    console.log("app is listen on 5000 PORT")
})


