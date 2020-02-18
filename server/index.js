const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/reviews/:productId/list', async (req, res) => {
  const { productId } = req.params;
  const { count, sort, page } = req.query;
  res.status(200).send(`main get route served ${sort}`);
});

app.get('/reviews/:productId/meta', async (req, res) => {
  const { productId } = req.params;
  res.status(200).send('Metadata returned from this end point');
});

app.post('/reviews/:productId', async (req, res) => {
  const { productId } = req.params;
  res.status(201).send('post route served');
});

app.put('/reviews/helpful/:review_id', async (req, res) => {
  const { review_id } = req.params;
  res.status(204).send('Helpful PUT route served');
});

app.put('/reviews/report/:review_id', async (req, res) => {
  const { review_id } = req.params;
  res.status(204).send('Review reported PUT served');
});

app.listen(PORT, () => {
  console.log(`Express is up and running on port ${PORT}`);
});
