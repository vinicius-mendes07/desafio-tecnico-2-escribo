const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());

app.use(routes);

app.use((req, res, next) => {
  res.status(404).json({ mensagem: 'Endpoint não encontrado.' });
});

app.listen(3000, () => console.log('Server started at http://localhost:3000'));
