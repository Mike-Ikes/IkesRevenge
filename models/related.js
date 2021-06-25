const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const relatedSchema = new Schema({
    id: Number,
    current_product_id: Number,
    related_product_id: Number,
});

const relatedExport = mongoose.model('related', relatedSchema, 'related');
module.exports = relatedExport;