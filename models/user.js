const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        default: "user"
    },
    date:{
        type: String,
        required: true,
        default: Date.now()
    }
})

module.exports = mongoose.model('user', UserSchema)