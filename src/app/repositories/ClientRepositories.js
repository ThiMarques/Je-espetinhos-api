/* eslint-disable @typescript-eslint/no-var-requires */
const db = require('../../database');

class ClientRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT clients.*, products.name AS product_name
      FROM clients
      LEFT JOIN products ON products.id = clients.product_id
      ORDER BY clients.name ${direction}
    `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT clients.*, products.name AS product_name
      FROM clients
      LEFT JOIN products ON products.id = clients.product_id
      WHERE clients.id = $1
    `, [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM clients WHERE email = $1', [email]);
    return row;
  }

  async create({
    name, email, phone, product_id,
  }) {
    const [row] = await db.query(`
      INSERT INTO clients(name, email, phone, product_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [name, email, phone, product_id]);
    return row;
  }

  async update(id, {
    name, email, phone, product_id,
  }) {
    const [row] = await db.query(`
      UPDATE clients
      SET name = $1, email = $2, phone = $3, product_id = $4
      WHERE id = $5
      RETURNING *
    `, [name, email, phone, product_id, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM clients WHERE id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new ClientRepository();
