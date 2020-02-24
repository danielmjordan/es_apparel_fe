/* eslint-disable camelcase */
require('dotenv').config();
const nr = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const controller = require('./models/controllers');

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(bodyParser.json());
app.use(cors());


app.get('/reviews/:productId/list', controller.getReviews);
app.get('/reviews/:productId/meta', controller.meta);
app.post('/reviews/:productId', controller.addReview);
app.put('/reviews/helpful/:reviewId', controller.markHelpful);
app.put('/reviews/report/:reviewId', controller.reportReview);

app.listen(PORT, () => {
  console.log(`Express is up and running on port ${PORT}`);
});
