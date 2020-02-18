const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());


app.get('/reviews/:productId/list', (req, res) => {
  res.json({ info: 'Information shipped here' });
});


app.listen(PORT, () => {
  console.log(`Express is up and running on port ${PORT}`);
});
