const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    filename:{
        type: String,
        required:true
    },
    contentType:{
        type: String,
        required: true
    },
    imageBase64:{
        type:String,
        required:true
    }
})

const schema = new mongoose.Schema({
    date: { type: String, required: true},
    classification: { type: String, required: true},
    money: { type: Number, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}, 
    description: String,
    receipt: imageSchema
})

const Record = mongoose.model('Record', schema)
module.exports = Record