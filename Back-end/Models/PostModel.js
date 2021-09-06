const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    date: {
        type: String,
        required: true
    },
    likes: [{
        type: String
    }],
    comment: [{
        author: {
            type: String
        },
        date: {
            type: String
        },
        content: {
            type: String
        }
    }]
})

const Post = mongoose.model('posts', postSchema);

module.exports = Post;