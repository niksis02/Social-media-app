const mongoose = require('mongoose');

const notifSchema = mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    }
});

const Notification = mongoose.model('notifications', notifSchema);

module.exports = Notification;