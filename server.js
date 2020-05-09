const express = require('express');
const cors = require('cors')

const productApi = require('./routes/products.js');
const serviceApi = require('./routes/services')
const { port } = require('./config');

const app = express();
app.use(express.json());
app.use(cors());

productApi(app);
serviceApi(app);

app.listen(port, () => {
  console.log("Listening in port", port);
});