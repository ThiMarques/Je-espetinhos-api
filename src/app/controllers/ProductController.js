const ProductsRepository = require('../repositories/ProductRepositories');

class ProductController {
  async index(req, res) {
    const products = await ProductsRepository.findAll();

    res.json(products);
  }

  async show(req, res) {
    const { id } = req.params;
    const product = await ProductsRepository.findById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  }

  async store(req, res) {
    const { name, price, ingredients, category_id } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const productExists = await ProductsRepository.findByName(name);

    if (productExists) {
      return res.status(400).json({ error: 'This name is already in use' });
    }

    const product = await ProductsRepository.create({
      name, price, ingredients, category_id
    });

    res.json(product);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, price, ingredients, category_id } = req.body;

    const productExists = await ProductsRepository.findById(id);
    if (!productExists) {
      return res.status(400).json({ error: 'Product not found' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const product = await ProductsRepository.update(id, {
      name, price, ingredients, category_id,
    });

    res.json(product);
  }

  async delete(req, res) {
    const { id } = req.params;
    const product = await ProductsRepository.findById(id);

    if (!product) {
      return res.status(404).json({ error: 'User not found' });
    }

    await ProductsRepository.delete(id);

    res.sendStatus(204);
  }
}

module.exports = new ProductController();
