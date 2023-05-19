const db = require('../../database');

class OrdeRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT orders.*, products.name AS product_name, clients.name AS client_name
      FROM orders
      LEFT JOIN products ON products.id = orders.product_id
      LEFT JOIN clients ON clients.id = orders.client_id
      ORDER BY orders.orderd ${direction}
    `);
    return rows;
  }

  async findByOrderd(orderd) {
    const [row] = await db.query(`
      SELECT orders.*, products.name AS product_name, clients.name AS client_name
      FROM orders
      LEFT JOIN products ON products.id = orders.product_id
      LEFT JOIN clients ON clients.id = orders.client_id
      WHERE orders.orderd = $1
    `, [orderd]);
    return row;
  }

  async create({
    orderd, requestedAt, product_id, client_id,
  }) {
    const [row] = await db.query(`
      INSERT INTO orders(orderd, requestedAt, product_id, client_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [orderd, requestedAt, product_id, client_id]);
    return row;
  }

  async delete(orderd) {
    const deleteOp = await db.query('DELETE FROM orders WHERE orderd = $1', [orderd]);
    return deleteOp;
  }
}

module.exports = new OrdeRepository();
