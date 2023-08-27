

const mongoose = require("mongoose")
// const ObjectId = mongoose.Schema.Types.ObjectId

const ConverSationSchema = new mongoose.Schema({
    members: {
        type: Array
       
    },
    message: {
        type: String
    },
    
   
}, { timestamps: true })

module.exports = mongoose.model('ConverSation', ConverSationSchema)





