const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stylesaggregates = new Schema({
    style_id: Number,
    productId: Number,
    name: String,
    original_price: String,
    sale_price: String,
    'default?': Boolean,
    photos:[Object],
    skus: Object,
});

const stylesaggregatesExport = mongoose.model('stylesaggregates', stylesaggregates, 'stylesaggregates');
module.exports = stylesaggregatesExport;

/* placeholder for the command used to create the aggregation within Mongo terminal
use products

db.styles.aggregate([
  {$lookup: {
    from: 'photos',
    localField: 'style_id',
    foreignField: 'styleId',
    as: 'photos'
  }},
  {$lookup: {
    from: 'skus',
    localField: 'style_id',
    foreignField: 'styleId',
    as: 'skus'
  }},
  {$project: {
    style_id: 1,
    productId: 1,
    name: 1,
    sale_price: 1,
    original_price: 1,
    'default?': 1,
    'skus.id': 1,
    'skus.size': 1,
    'skus.quantity': 1,
  }},
  {$project: {
    style_id: 1,
    productId: 1,
    name: 1,
    sale_price: 1,
    original_price: 1,
    'default?': 1,
    skus: {
      $arrayToObject: {
        $map: {
          input: '$skus',
          as: 'el',
          in: {
            k: {
            $toString: '$$el.id'
            },
          v: '$$el',
          }
        }
      }
    }
  }},
  {$out: 'stylesaggregates'}
])

*/