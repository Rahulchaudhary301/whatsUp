const multer=require('multer')
const {GridFsStorage}=require('multer-gridfs-storage')



const storage=new GridFsStorage({
    url:'mongodb+srv://RahulChaudhary:Rahul321@cluster1.42h1ws9.mongodb.net/WhatsApp_Clone?retryWrites=true&w=majority',
    option:{ useNewUrlParser: true, useUnifiedTopology: true },
    file:(req,file)=>{
        const match=["image/png","image/jpg"];
        if(match.indexOf(file.mimeType==-1)){
            return `${Date.now()}-file-${file.originalname}`
        }

        return{
            bucketName:"photos",
            fileName:`${Date.now}-file-${file.originalname}`
        }

    }
})

module.exports=multer({storage})