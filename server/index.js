const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

//parameters --> are count, sort, and page
app.get('/reviews/:productId/list', (req, res) => {
  res.json({ info: 'Information shipped here' });
  res.status(200).send('main get route served');
});

app.get('/reviews/:productId/meta', (req, res) => {
  res.status(200).send('Metadata returned from this end point');
});

app.post('/reviews/:productId', (req, res) => {
  res.status(201).send('post route served');
});

app.put('/reviews/helpful/:review_id', (req, res) => {
  res.status(204).send('Helpful PUT route served');
});

app.put('/reviews/report/:review_id', (req, res) => {
  res.status(204).send('Review reported PUT served');
});


app.listen(PORT, () => {
  console.log(`Express is up and running on port ${PORT}`);
});
