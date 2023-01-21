const productsModel = require('../models/productModels');
const productsService = require('../services/productServices');

const { 
  HTTP_200_OK,
  HTTP_I_SV_ER,
  HTTP_NOT_FND,
  HTTP_CONFLIT,
  HTTP_CREATED,
  HTTP_NO_CONT,
} = require('../httpConstNames');

const NOT_FOUND_MESSAGE = 'Product not found';

const getAllProducts = async (_req, res) => {
  try {
    const products = await productsModel.getAllProducts();
    return res.status(HTTP_200_OK).json(products);
  } catch (error) {
    return res.status(HTTP_I_SV_ER).json({ message: 'Server issues' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProductById(id);
    if (!product || product.length < 1) {
      return res.status(HTTP_NOT_FND).json({ message: NOT_FOUND_MESSAGE });
    }
    return res.status(HTTP_200_OK).json(product);
  } catch (error) {
    return res.status(HTTP_NOT_FND).json({ message: NOT_FOUND_MESSAGE });
  }
};

const getProductByName = async (name) => {
  try {
    const product = await productsService.getProductByName(name);
    return product;
  } catch (error) {
    return { error: HTTP_I_SV_ER, message: 'Server error' };
  }
};

const createProduct = async (req, res) => {
  try {
    const { name } = req.body;
    const doubleNameCheck = await productsService.getProductByName(name);
    if (!doubleNameCheck) {
      const newProduct = await productsService.createProduct(req.body);
      return res.status(HTTP_CREATED).json(newProduct);
    }
    return res.status(HTTP_CONFLIT).json({ message: 'Product already exists' });
  } catch (error) {
    return res.status(HTTP_CONFLIT).json({ message: 'Product already exists' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const doubledIdSearch = await productsService.getProductById(id);
    if (!doubledIdSearch) return res.status(404).json({ message: 'Product not found' });
    
    const updatedProduct = await productsService.updateProduct({ ...req.body, id });
    return res.status(HTTP_200_OK).json(updatedProduct);
  } catch (error) {
    return res.status(HTTP_NOT_FND).json({ message: NOT_FOUND_MESSAGE });
  }
};

const deleteProduct = async (req, res) => {
  try {
  const { id } = req.params;

  const productId = await productsService.getProductById(id);
  if (!productId) {
    return res.status(HTTP_NOT_FND).json({ message: NOT_FOUND_MESSAGE });
  }

  await productsService.deleteProduct(id);

  return res.status(HTTP_NO_CONT).end();
  } catch (err) {
    return res.status(HTTP_NOT_FND).json({ message: NOT_FOUND_MESSAGE });
  }
};

module.exports = { 
  getAllProducts,
  getProductById,
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct,
};