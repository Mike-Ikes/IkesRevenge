const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsaggregates = new Schema({
    id: Number,
    name: String,
    slogan: String,
    description: String,
    category: String,
    default_price: String,
    features: [Object]
});

const productsaggregatesExport = mongoose.model('productsaggregates', productsaggregates, 'productsaggregates');
module.exports = productsaggregatesExport;