const express = require('express');
const cors = require('cors')

const productApi = require('./routes/products.js');
const { port } = require('./config');

const app = express();
app.use(express.json());
app.use(cors());

productApi(app);

app.listen(port, () => {
  console.log("Listening in port", port);
});