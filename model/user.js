const mongoose = require('mongoose');

//Create Scheme or Database
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type : String,
        required : true,
        max : 10,
        min : 6
    }
});

module.exports = mongoose.model('users', userSchema);