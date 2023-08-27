const express =require('express')
const Router=express.Router()
const ChatController=require('../controller/Chat')

const upload=require('../controller/util/upload.js')


Router.get('/',(req,res)=>{
  res.send({status:true,msg:"connected"})
})

Router.post('/addUser',ChatController.AddData )

Router.get('/allUser',ChatController.GetUser)

Router.post('/conversation',ChatController.AddConversation)

Router.post('/getConversatinId',ChatController.GetConvoId)

Router.post('/sendMessage',ChatController.AddMessage)

Router.post('/getmessage',ChatController.GetMessage)

Router.post('/file/uploadImage',upload.single("file"),ChatController.UploadFile)

Router.get('/file/:filename',ChatController.GetImage)

Router.post('/getConversation',ChatController.GetConversatonData)

module.exports=Router