const productModel = require('../models/productModels');

const getAllProducts = async () => {
  const result = await productModel.getAllProducts();
  return result;
};

  const getProductById = async (productId) => {
    const result = await productModel.getProductById(productId);
    return result;
  };
  
  const getProductByName = async (name) => {
    const result = await productModel.getProductByName(name);
    return result;
  };
  
  const updateProduct = async (product) => {
    const result = await productModel.updateProduct(product);
    return result;
  };
  
  const createProduct = async (product) => {
    const result = await productModel.createProduct(product);
    return result;
  };
  
  const deleteProduct = async (id) => {
    const result = await productModel.deleteProduct(id);
    return result;
  };

module.exports = { 
  getProductById, getProductByName, getAllProducts, updateProduct, createProduct, deleteProduct };