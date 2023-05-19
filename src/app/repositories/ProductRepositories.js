const db = require('../../database');

class ProductRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT products.*, categories.name AS category_name
      FROM products
      LEFT JOIN categories ON categories.id = products.category_id
      ORDER BY products.name ${direction}
    `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT products.*, categories.name AS category_name
      FROM products
      LEFT JOIN categories ON categories.id = products.category_id
      WHERE products.id = $1
    `, [id]);
    return row;
  }

  async findByName(name) {
    const [row] = await db.query('SELECT * FROM products WHERE name = $1', [name]);
    return row;
  }

  async create({
    name, price, ingredients, category_id
  }) {
    const [row] = await db.query(`
      INSERT INTO products(name, price, ingredients, category_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [name, price, ingredients, category_id]);
    return row;
  }

  async update(id, {
    name, price, ingredients, category_id,
  }) {
    const [row] = await db.query(`
      UPDATE products
      SET name = $1, price = $2, ingredients = $3, category_id = $4
      WHERE id = $5
      RETURNING *
    `, [name, price, ingredients, category_id, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM products WHERE id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new ProductRepository();
