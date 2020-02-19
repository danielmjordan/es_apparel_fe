/* eslint-disable camelcase */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const query = require('./models/queries.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/reviews/:product_id/list', async (req, res) => {
  const { product_id } = req.params;
  // const { count, sort, page } = req.query;
  const results = await query.getByDate(product_id);
  res.status(200).send(results);
});

app.get('/reviews/:product_id/meta', async (req, res) => {
  const { product_id } = req.params;
  res.status(200).send('Metadata returned from this end point');
});

app.post('/reviews/:product_id', async (req, res) => {
  const { product_id } = req.params;
  res.status(201).send('post route served');
});

app.put('/reviews/helpful/:review_id', async (req, res) => {
  const { review_id } = req.params;
  await query.helpful(review_id);
  res.status(204).send();
});

app.put('/reviews/report/:review_id', async (req, res) => {
  const { review_id } = req.params;
  await query.report(review_id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Express is up and running on port ${PORT}`);
});
