const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const related = new Schema({
    id: Number,
    current_product_id: Number,
    related_product_id: Number,
});

const relatedExport = mongoose.model('related', related);
module.exports = relatedExport;