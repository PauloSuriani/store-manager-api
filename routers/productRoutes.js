const express = require('express');

const products = require('../controllers/productControllers');
const { productNameValidation, 
  productQuantityValidation } = require('../middlewares/productValidation');

const routers = express.Router();

routers
  .get('/', products.getAllProducts)
  .get('/:id', products.getProductById)
  .post('/', productNameValidation, productQuantityValidation, products.createProduct)
  .put('/:id', productNameValidation, productQuantityValidation, products.updateProduct)
  .delete('/:id', products.deleteProduct);

module.exports = routers;