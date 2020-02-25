/* eslint-disable camelcase */
require('dotenv').config();
const nr = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const controller = require('./models/controllers');

const app1 = express();
const app2 = express();
const app3 = express();

const PORT1 = process.env.SERVER_PORT1 || 3001;
const PORT2 = process.env.SERVER_PORT2 || 3002;
const PORT3 = process.env.SERVER_PORT3 || 3003;

app1.use(bodyParser.json());
app2.use(bodyParser.json());
app3.use(bodyParser.json());
app1.use(cors());
app2.use(cors());
app3.use(cors());

app1.get('/reviews/:productId/list', controller.getReviews);
app1.get('/reviews/:productId/meta', controller.meta);
app1.post('/reviews/:productId', controller.addReview);
app3.put('/reviews/helpful/:reviewId', controller.markHelpful);
app3.put('/reviews/report/:reviewId', controller.reportReview);

app1.listen(PORT1, () => console.log(`server 1 up and running on port: ${PORT1}`));
app2.listen(PORT2, () => console.log(`server 2 up and running on port: ${PORT2}`));
app3.listen(PORT3, () => console.log(`server 3 up and running on port: ${PORT3}`));
