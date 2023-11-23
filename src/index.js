require('dotenv').config();
const express = require('express');
const routes = require('./routes');
require('express-async-errors');

const app = express();
app.use(express.json());

app.use(routes);

app.use((req, res, next) => {
  res.status(404).json({ mensagem: 'Endpoint não encontrado.' });
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({ mensagem: error.message });
});

app.listen(3000, () => console.log('Server started at http://localhost:3000'));
