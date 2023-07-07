const mongoose = require('mongoose');


// User data to be stored in this format
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: { 
        type: String, 
        enum: ['admin', 'user'], 
        default: 'user'
    }
})

const User = mongoose.model("USER", userSchema);

module.exports = User;