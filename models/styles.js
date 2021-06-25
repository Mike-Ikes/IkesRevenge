const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const styles = new Schema({
    id: Number,
    productId: Number,
    name: String,
    original_price: String,
    sale_price: String,
    default_style: Boolean,
});

const stylesExport = mongoose.model('styles', styles);
module.exports = stylesExport;