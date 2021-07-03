// const productRoute = require('./productRoute');
const app = require('../app.js');
const mongoose = require('mongoose');
// const Products = require('../models/products');
//https://www.npmjs.com/package/supertest
const supertest = require('supertest');
const request = supertest(app);

afterAll((done) => {
  mongoose.connection.close();
  done()
})

//placeholder for randomId to be populated using the products request test below
//avoids having to make duplicate requests to generate randomId in tests below
let randomId = 0;

it('creates random product id from 0 to 100,000 based on /products/?count=100000 response', async () => {
  const {body: response} = await request.get(`/products/?count=100000`);
  randomId = Math.floor(Math.random() * response.length);
  console.log(`random product id generated: ${randomId}`);
})

it('Retrieves a default of 5 for GET /products', async () => {
  const { body: response } = await request.get('/products');
  expect(response.length).toEqual(5);
})

it('Retrieves a random product for GET /products/randomId', async () => {
  const { body: response } = await request.get(`/products/${randomId}`);
  expect(response[0].id === randomId).toBe(true);
})

it('Retrieves /styles for a random product for GET /products/randomId/styles', async () => {
  const { body } = await request.get(`/products/${randomId}/styles`);
  expect(body.product_id).toBe(`${randomId}`);
  expect(typeof body.results[0].style_id).toBe('number');
})

it('Retrieves /related for a random product for GET /products/randomId/related', async () => {
  const { body: response } = await request.get(`/products/${randomId}/related`);
  let sum = response.reduce((a,b) => a + b, 0);
  expect(typeof sum).toBe('number');
})