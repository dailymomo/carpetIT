const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {type:String, required: true, unique: true},
    password: { type: String, required: true },
    secret_one: { type: String, required: true },
    date: { type: Date, default: Date.now},
    budget:String
})
   
const users = mongoose.model('users', schema)
module.exports = users