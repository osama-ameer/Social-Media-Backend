const mongoose = require('mongoose')

const PostScheme = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true,
        default: Date.now()
    }
})


module.exports = mongoose.model("post", PostScheme)