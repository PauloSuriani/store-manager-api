const express = require('express');

const productsDB = require('../controllers/productControllers');
const { productValidation } = require('../middlewares/productValidation');

const routers = express.Router();

routers
  .get('/', productsDB.getAllProducts)
  .get('/:id', productsDB.getProductById)
  .post('/', productValidation, productsDB.createProduct)
  .put('/:id', productValidation, productsDB.updateProduct)
  .delete('/:id', productsDB.deleteProduct);

module.exports = routers;