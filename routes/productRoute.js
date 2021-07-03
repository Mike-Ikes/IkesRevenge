var express = require('express');
var router = express.Router();

//model imports and references
const Products = require('../models/products');
const Related = require('../models/related');
const StylesAggregates = require('../models/stylesaggregates');
const ProductsAggregates = require('../models/productsaggregates');
// const Features = require('../models/features');
// const Photos = require('../models/photos');
// const Styles = require('../models/styles');
// const Skus = require('../models/skus');

/* GET all products */
//find products with specifc property filters like id
//skips and limits results based on user input or defaults to page 1, count 5
//lean returns a javascript object instead of mongo object
router.get('/', async function(req, res) {
  const {page = 1, count = 5} = req.query;
  let results = await Products.find({}, {'_id': 0}).skip((page - 1) * count).limit(parseInt(count)).lean();
  res.json(results);
});

/* GET single product */
router.get('/:product_id', async function(req, res) {
  const {product_id} = req.params;
  let results = await ProductsAggregates.find({id: product_id}, {_id: 0}).lean();
  res.json(results);
});

/*GET styles for a single product */
router.get('/:product_id/styles', async function(req, res) {
  const {product_id} = req.params;
  let results = await StylesAggregates.find({productId: parseInt(product_id)}, {'_id': 0, 'productId': 0}).lean();
  res.json({product_id: product_id, results: results});
});

/* GET related products for a single product */
router.get('/:product_id/related', async function(req, res) {
  const {product_id} = req.params;
  let dbRelatedProducts = await Related.find({current_product_id: product_id}, {'_id': 0, 'id': 0, 'current_product_id': 0}).lean();
  let relatedProducts = [];
  for (let product of dbRelatedProducts) {
    relatedProducts.push(product.related_product_id);
  }
  res.send(relatedProducts);
});

module.exports = router;


/* GET all products (promise based code)
router.get('/', function(req, res) {
  const {page = 1, count = 5} = req.query;
  //find products with specifc property filters like id
  //skips and limits results based on user input or defaults to page 1, count 5
  //lean returns a javascript object instead of mongo object
  Products.find({}, {'_id': 0}).skip((page - 1) * count).limit(parseInt(count))
    .then(results => res.json(results))
    .catch(err => console.error(err));
});
*/

/* GET single product PRIOR TO DATA AGGREGATION ON DATABASE
router.get('/:product_id', async function(req, res) {
  const {product_id} = req.params;
  let results = await Products.find({id: product_id}, {'_id': 0}).lean();
  for (let i = 0; i < results.length; i++) {
    results[i].features = await Features.find({product_id: product_id}, {'_id': 0, 'id': 0, 'product_id': 0}).lean();
  }
  res.json(results);
});
*/

/* GET styles for a single product (prior to data aggregation)
router.get('/:product_id/styles', async function(req, res) {
  const {product_id} = req.params;
  let results = await Styles.find({productId: parseInt(product_id)}, {'_id': 0, 'id': 0, 'productId': 0}).lean();
  for (let i = 0; i < results.length; i++) {
    results[i].photos = await Photos.find({styleId: parseInt(product_id)}, {'_id': 0, 'id': 0, 'styleId': 0}).lean();
    results[i].skus = await Skus.find({styleId: parseInt(product_id)}, {'_id': 0, 'id': 0, 'styleId': 0}).lean();
  }
  res.json({product_id: product_id, results: results});
});
*/