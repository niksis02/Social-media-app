const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String, 
        required: true
    },
    text: {
        type: String,
    }
}, { timestamps: true} );

const Message = mongoose.model('messages', messageSchema);

module.exports = Message;