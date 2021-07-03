const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photo = new Schema({
    id: Number,
    styleId: Number,
    url: String,
    thumbnail_url: String,
});

const photoExport = mongoose.model('photos', photo);
module.exports = photoExport;