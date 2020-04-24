const express = require('express');
const productApi = require('./routes/productos.js')
const { port } = require('./config')

const app = express();
app.use(express.json())

productApi(app);

app.listen(port, () => {
  console.log("Listening in port", port)
});