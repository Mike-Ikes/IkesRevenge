var express = require('express');
var router = express.Router();

//set up model imports and references
const products = require('../models/products');
const features = require('../models/features');
const photos = require('../models/photos');
const related = require('../models/related');
const styles = require('../models/styles');

/* GET all products */
router.get('/', async function(req, res, next) {
  const {page = 1, count = 5} = req.query;
  //find products with specifc property filters like id
  //skips and limits results based on user input or defaults to page 1, count 5
  //lean returns a javascript object instead of mongo object
  let results = await products.find().skip((page - 1) * count).limit(parseInt(count)).lean();
  return res.json(results);
});

/* GET single product */
router.get('/:product_id', async function(req, res, next) {
  const {product_id} = req.query;
  let results = await products.find({id: product_id}).lean();
  return res.json(results);
});

/* GET styles for a single product */
router.get('/:product_id/styles', async function(req, res, next) {
  const {product_id} = req.query;
  let results = await styles.find({product_id: product_id}).lean();
  results.photos = await photos.find({styleId: product_id}).lean();
  results.skus = await skus.find({styleId: product_id}).lean();
  return res.json(results);
});

/* GET related products for a single product */
router.get('/:product_id/related', async function(req, res, next) {
  const {product_id} = req.query;
  let results = await related.find({current_product_id: product_id}, 'related_product_id').lean();
  return res.send(Object.values(results));
});

module.exports = router;
