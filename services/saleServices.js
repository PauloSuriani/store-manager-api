const salesModel = require('../models/saleModels');
const productModels = require('../models/productModels');

const getAllSales = async () => {
  const result = await salesModel.getAllSales();
  return result;
};

const getSaleById = async (id) => {
  const result = await salesModel.getSaleById(id);
  return result;
};

const createSale = async (sales) => {
  await Promise.all(sales
    .map(async (sale) => {
      const { id, name, quantity } = await productModels.getProductById(sale.productId);
      console.log('id na q | sale...', id, name, quantity, sale.id, sale.name, sale.quantity);
      const novaQuantidade = quantity - sale.quantity;
      if (quantity <= 0 || quantity < sales.quantity || novaQuantidade <= 0) {
        throw new Error(422, 'Such amount is not permitted to sell');
      }
      await productModels.updateProduct({ name, quantity: novaQuantidade, id });
    }));
    const newSales = await salesModel.createSale(sales);
    return newSales;
};

const updateSale = async (sale, id) => {
  const result = await salesModel.updateSale(sale, id);
  return result;
};

const deleteSale = async (idSale) => {
  const result = await salesModel.deleteSale(idSale);
  return result;
};

module.exports = { getAllSales, getSaleById, createSale, updateSale, deleteSale };