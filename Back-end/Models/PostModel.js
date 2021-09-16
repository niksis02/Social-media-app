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
    likes: [String],
    comments: [{
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
}, {timestamps: true});

const Post = mongoose.model('posts', postSchema);

module.exports = Post;