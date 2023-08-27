const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim : true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim : true
    },
    img: {
        type: String,
        required: true,
        unique: true,
        trim : true
    },
    id:{
        type: String,
        required: true,
        unique: true,
        trim : true
    },
    sub:{
        type: String,
        required: true,
        trim : true

    },
    // id: {
    //     type: ObjectId,
    //     ref: 'College'
    // },
   
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema)





