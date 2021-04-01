const express = require('express');

const routes = require('./routes/calc.routes');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('Server started at port 3333')
})