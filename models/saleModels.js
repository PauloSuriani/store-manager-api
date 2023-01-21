const connection = require('./dataBaseConnection');

const getAllSales = async () => {
  const [sales] = await connection.query(
    `SELECT sale_id AS saleId, product_id AS productId, quantity, sales.date 
     FROM sales_products
     INNER JOIN sales ON sales_products.sale_id = sales.id
     ORDER BY sales.id`,
  );
  return sales;
};

const getSaleById = async (id) => {
  const [sale] = await connection.query(
    `SELECT product_id AS productId, quantity, sales.date 
     FROM sales_products
     INNER JOIN sales ON sales_products.sale_id = sales.id
     WHERE sales.id = ?`, [id],
  );
  return sale;
};

const createSale = async (sales) => {
  // faz inserção no BD (tabela "sales") e recupera o Id da inserção
  const [{ insertId }] = await connection.execute('INSERT INTO sales SET date = now()');
  // atualiza as linhas da tab "sales_products"
  await sales.map(({ quantity, productId }) => (
    connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?);',
      [insertId, productId, quantity],
  )));
  return { id: insertId, itemsSold: sales }; 
};

const updateSale = async (sale, id) => {
  const [{ productId, quantity }] = sale;
  await connection.execute(`
  UPDATE sales_products
  SET product_id = ?, quantity = ?
  WHERE sale_id = ?`,
  [productId, quantity, id]);
  return {
    saleId: id,
    itemUpdated: sale,
  };
};

const deleteSale = async (id) => {
  const sale = await getSaleById(id);
  await Promise.all(sale
    .map(({ productId, quantity }) => connection.execute(
      'UPDATE products SET quantity = quantity + ? WHERE id = ?',
      [quantity, productId],
    )));
  await connection.execute('DELETE FROM sales_products WHERE sale_id = ?', [id]);
  await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
};

module.exports = { getAllSales, getSaleById, createSale, updateSale, deleteSale };