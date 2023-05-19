const OrdersRepository = require('../repositories/OrderRepositories');

class OrderController {
  async index(req, res) {
    const orders = await OrdersRepository.findAll();

    res.json(orders);
  }

  async show(req, res) {
    const { orderd } = req.params;
    const order = await OrdersRepository.findByOrderd(orderd);

    if (!order) {
      return res.status(404).json({ error: 'Orderd not found' });
    }

    res.json(order);
  }

  async store(req, res) {
    const { orderd, requestedAt, product_id, client_id } = req.body;

    if (!orderd) {
      return res.status(400).json({ error: 'Orderd is required' });
    }

    const order = await OrdersRepository.create({
      orderd, requestedAt, product_id, client_id,
    });

    res.json(order);
  }

  async delete(req, res) {
    const { orderd } = req.params;
    const orders = await OrdersRepository.findByOrderd(orderd);

    if (!orders) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await OrdersRepository.delete(orderd);

    res.sendStatus(204);
  }
}

module.exports = new OrderController();
