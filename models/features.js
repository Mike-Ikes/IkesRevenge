const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const features = new Schema({
    id: Number,
    product_id: Number,
    feature: String,
    value: String,
});

const featuresExport = mongoose.model('features', features);
module.exports = featuresExport;