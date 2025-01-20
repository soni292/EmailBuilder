const mongoose = require('mongoose');

const ConfigSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
}, { timestamps: true });

module.exports = mongoose.model('Config', ConfigSchema);
