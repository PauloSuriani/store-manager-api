const express = require('express');

const salesController = require('../controllers/saleControllers');
const { saleValidation } = require('../middlewares/saleValidation');

// conjunto de rotas disponíveis para Vendas
const routers = express.Router();

routers
  .get('/', salesController.getAllSales)
  .get('/:id', salesController.getSaleById)
  .post('/', saleValidation, salesController.createSale)
  .put('/:id', saleValidation, salesController.updateSale)
  .delete('/:id', salesController.deleteSale);

module.exports = routers;