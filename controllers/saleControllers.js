const salesModel = require('../models/saleModels');
const salesService = require('../services/saleServices');

const { 
  HTTP_200_OK,
  HTTP_I_SV_ER,
  HTTP_NOT_FND,
  HTTP_UNP_ENT,
  HTTP_CREATED,
  HTTP_NO_CONT,
} = require('../httpConstNames');

const NOT_FOUND_MSG = 'Sale not found';
const SUCH_AMOUNT_MSG = 'Such amount is not permitted to sell';

const getAllSales = async (_req, res) => {
  try {
    const sales = await salesModel.getAllSales();
    return res.status(HTTP_200_OK).json(sales);
  } catch (error) {
    return res.status(HTTP_I_SV_ER).json({ message: 'Server issues' });
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await salesService.getSaleById(id);
    if (!sale || sale.length < 1) {
      return res.status(HTTP_NOT_FND).json({ message: NOT_FOUND_MSG });
    }

    return res.status(HTTP_200_OK).json(sale);
  } catch (error) {
    return res.status(HTTP_NOT_FND).json({ message: NOT_FOUND_MSG });
  }
};

const createSale = async (req, res) => {
  try {
    const newSale = await salesService.createSale(req.body);

    return res.status(HTTP_CREATED).json(newSale);
  } catch (error) {
    return res.status(HTTP_UNP_ENT).json({ message: SUCH_AMOUNT_MSG });
  }
};
  
const updateSale = async (req, res) => {
  try {
    const { id } = req.params;

    const checkDoubledId = await salesService.getSaleById(id);
    if (!checkDoubledId) {
      return res.status(HTTP_NOT_FND).json({ message: NOT_FOUND_MSG });
    }
    const sale = await salesService.updateSale(req.body, id);

    console.log(req.body);
    
    return res.status(HTTP_200_OK).json(sale);
  } catch (error) {
    return res.status(HTTP_NOT_FND).json({ messge: NOT_FOUND_MSG });
  }
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  
  const checkAlreadyExistsId = await salesService.getSaleById(id);
  if (!checkAlreadyExistsId || checkAlreadyExistsId.length === 0) {
    return res.status(HTTP_NOT_FND).json({ message: NOT_FOUND_MSG });
  }

  await salesService.deleteSale(id);

  return res.status(HTTP_NO_CONT).end();
};

module.exports = { getAllSales, getSaleById, createSale, updateSale, deleteSale };