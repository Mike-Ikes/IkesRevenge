const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skus = new Schema({
    id: Number,
    styleId: Number,
    size: String,
    quantity: Number,
});


const skusExport = mongoose.model('skus', skus);
module.exports = skusExport;