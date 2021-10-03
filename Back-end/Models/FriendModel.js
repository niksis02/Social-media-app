const mongoose = require('mongoose');

const friendSchema = mongoose.Schema({
    user1: {
        type: String,
        required: true
    },
    user2: {
        type: String,
        required: true
    }
});

const Friend = mongoose.model('friends', friendSchema);

module.exports = Friend;