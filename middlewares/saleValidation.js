const { HTTP_BAD_RQT, HTTP_UNP_ENT } = require('../httpConstNames');

const saleValidation = async (req, res, next) => {
  const [body] = req.body;
  const { productId, quantity } = body;

  // checa validade do id do produto
  if (!productId) {
    return res.status(HTTP_BAD_RQT).send({ message: '"productId" is required' });
  }

  // checa validade em quantificação da venda
  if (!quantity) {
    return res.status(HTTP_BAD_RQT).send({ message: '"quantity" is required' });
  }

  if (quantity < 1) {
    return res.status(HTTP_UNP_ENT).send(
      { message: '"quantity" must be greater than or equal to 1' },
    );
  }

  next();
};
  
module.exports = { saleValidation };