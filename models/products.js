const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const products = new Schema({
    id: Number,
    name: String,
    slogan: String,
    description: String,
    category: String,
    default_price: String,
});

const productExport = mongoose.model('product', products);
module.exports = productExport;