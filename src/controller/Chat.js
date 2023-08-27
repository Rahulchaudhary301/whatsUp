const UserSchema=require('../model/Schema')
const Conversations=require("../model/ConversationSchema")
const MessageSchema=require('../model/MessageSchema')

const grid=require('gridfs-stream')
const mongoose=require('mongoose')

const url="http://localhost:5000"

let gfs , gridfsBucket;
const conn=mongoose.connection;
conn.once('open',()=>{
  gridfsBucket= new mongoose.mongo.GridFSBucket(conn.db,{
    bucketName:'fs'
  });
  gfs=grid(conn.db, mongoose.mongo);
  gfs.collection('fs');
});


const AddData= async(req,res)=>{
    try {
      const bodyData=req.body
      const {email,name,picture,jti,sub}=bodyData
      
      const userData={
            name:name,
            email:email,
            img:picture,
            id:jti,
            sub:sub,
      }

    const existUser= await UserSchema.findOne({sub:sub})

    if(existUser){
      return res.status(200).send({status:true,msg:"Exitance user!!!"})
    }
      await UserSchema.create(userData)
      return res.status(201).send({status:true,msg:"crete succesfully !!!"})

        
    } catch (error) {
      res.status(500).send({status:false,msg:error})
    }
}


const GetUser= async(req,res)=>{
  try {
   
  const User= await UserSchema.find()

  if(!User){
    return res.status(200).send({status:true,msg:"No User Avilable !!!"})
  }
    return res.status(200).send({status:true,data:User})

  } catch (error) {
    res.status(500).send({status:false,msg:error})
  }
}





const GetConvoId= async(req,res)=>{
  try {

    const{senderId,ReceivedId}=req.body
  const User= await Conversations.findOne({members:{$all:[senderId,ReceivedId]}})

  if(!User){
    return res.status(200).send({status:true,msg:"No User Avilable !!!"})
  }
    return res.status(200).send({status:true,data:User})

  } catch (error) {
    res.status(500).send({status:false,msg:error})
  }
}





const AddConversation= async(req,res)=>{
  try {
   
  const { SenderId, ReceiverId}=req.body

  const Exit= await Conversations.findOne({members:{$all:[SenderId, ReceiverId]}})

  if(Exit){

    return res.status(200).send({status:true,msg:"User Avilable !!!"})
  }
   const convo=await Conversations.create({members:[SenderId, ReceiverId]})
    return res.status(200).send({status:true,msg:"Creat Converasation successfully !!!"})

  } catch (error) {
    res.status(500).send({status:false,msg:error})
  }
}





const AddMessage= async(req,res)=>{
  try {
   
  const{text,conversationId}=req.body

   const convo=await MessageSchema.create(req.body)
   const latetetMessage=await Conversations.findByIdAndUpdate(conversationId,{message:text})
    return res.status(200).send({status:true,msg:"Creat message successfully !!!"})

  } catch (error) {
    res.status(500).send({status:false,msg:error})
  }
}




const GetMessage= async(req,res)=>{
  try {
   
  const{conversationId}=req.body

 // console.log(conversationId)
  
   const message=await MessageSchema.find({conversationId:conversationId})
    return res.status(200).send({status:true,data:message})

  } catch (error) {
    res.status(500).send({status:false,msg:error})
  }
}









const UploadFile= async(req,res)=>{
const url='http://localhost:5000'
  try {
    if(!req.file){
      return res.status(404).send({status:true,msg:"File not found"})
    }
     
    const ImageUrl=`${url}/file/${req.file.filename}`
      return res.status(200).send({status:true,data:ImageUrl})
  
    } catch (error) {
      res.status(500).send({status:false,msg:error})
    }
  }
  



 


      const GetImage= async(req,res)=>{
        try {
         
        
        const file= await gfs.files.findOne({filename:req.params.filename})
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);

        } catch (error) {
          res.status(500).send({status:false,msg:error})
        }
      }





      
const GetConversatonData= async(req,res)=>{
  try {
   
  const{SenderId,ReceivedId}=req.body

  
  
   const data=await Conversations.find({members:{ $all: [SenderId,ReceivedId]}})
    return res.status(200).send({status:true,data:data})

  } catch (error) {
    res.status(500).send({status:false,msg:error})
  }
}


 
module.exports={AddData ,GetUser,AddConversation,GetConvoId,AddMessage,GetMessage,UploadFile,GetImage ,GetConversatonData}