const { HTTP_BAD_RQT, HTTP_UNP_ENT } = require('../httpConstNames');

const productValidation = async (req, res, next) => {
  const { name, quantity } = req.body;

  // checa validade do nome do produto
  if (!name) {
    return res.status(HTTP_BAD_RQT).send({ message: '"name" is required' });
  }

  if (name.length < 5) {
    return res.status(HTTP_UNP_ENT).send(
      { message: '"name" length must be at least 5 characters long' },
    );
  }

  // checa validade em quantificação do produto
  if (quantity <= 0) {
    return res.status(HTTP_UNP_ENT).send(
      { message: '"quantity" must be greater than or equal to 1' },
    );
  }

  if (!quantity) {
    return res.status(HTTP_BAD_RQT).send({ message: '"quantity" is required' });
  }

  next();  
};
  
module.exports = { productValidation };