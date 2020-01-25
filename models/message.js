const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
    id: {type: Number, required: true},
    data: {type: [Number], required: true},
    timestamp: {type: Number, required: true},
    time: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Message", MessageSchema);
