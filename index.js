require('dotenv').config();

const express = require('express');

const productsRouters = require('./routers/productRouters');
const salesRouters = require('./routers/saleRouters');

const app = express();

app.use(express.json());

app.use('/products', productsRouters);

app.use('/sales', salesRouters);

app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
