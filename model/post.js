const mongoose = require('mongoose');

//Create Scheme or Database
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now()
    },
    imageURL: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('posts', postSchema);