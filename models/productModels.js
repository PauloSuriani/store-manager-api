const connection = require('./dataBaseConnection');

const getAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY products.id',
  );
  return products;
};

const getProductById = async (productId) => {
  const [product] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE products.id = ?', 
    [productId],
  );
  return product[0];
};

const getProductByName = async (name) => {
  const [product] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE products.name = ?', [name],
  );
  return product[0];
};

const updateProduct = async ({ name, quantity, id }) => {
  await connection.execute(
    'UPDATE products SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, id],
  );
  return {
    id,
    name,
    quantity,
  };
};

const createProduct = async ({ name, quantity }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products SET name = ?, quantity = ?', 
    [name, quantity],
  );
  return {
    id: insertId,
    name,
    quantity,
  };
};

const deleteProduct = async (id) => {
  const product = await connection.execute(
  'DELETE FROM products WHERE id = ?;',
  [id],
  );
  console.log('deleteProduct: ', product.ResultSetHeader);
  return product.ResultSetHeader;
};

module.exports = { getAllProducts, 
  getProductById,
  getProductByName,
  updateProduct,
  createProduct,
  deleteProduct,
};