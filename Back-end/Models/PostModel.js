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
    date: {
        type: String,
        required: true
    },
    likes: [{
        type: String
    }],
    comment: [{
        author: {
            type: String,
            default: ''
        },
        date: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            default: ''
        },
        replies: [{
            author: {
                type: String,
                default: ''
            },
            date: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: ''
            }
        }]
    }]
})

const Post = mongoose.model('posts', postSchema);

module.exports = Post;