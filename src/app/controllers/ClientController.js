/* eslint-disable @typescript-eslint/no-var-requires */
const ClientsRepository = require('../repositories/ClientRepositories');

class ClientController {
  async index(req, res) {
    const clients = await ClientsRepository.findAll();

    res.json(clients);
  }

  async show(req, res) {
    const { id } = req.params;
    const client = await ClientsRepository.findById(id);

    if (!client) {
      //404: Not Found
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(client);
  }

  async store(req, res) {
    const { name, email, phone, product_id } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const clientExists = await ClientsRepository.findByEmail(email);

    if (clientExists) {
      return res.status(400).json({ error: 'This email is already in use' });
    }

    const client = await ClientsRepository.create({
      name, email, phone, product_id,
    });

    res.json(client);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, email, phone, product_id } = req.body;

    const clientExists = await ClientsRepository.findById(id);
    if(!clientExists) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const clientByEmail = await ClientsRepository.findByEmail(email);
    if (clientByEmail && clientByEmail.id !== id) {
      return res.status(400).json({ error: 'This email is already in use' });
    }

    const client = await ClientsRepository.update(id, {
      name, email, phone, product_id,
    });

    res.json(client);
  }

  async delete(req, res) {
    const { id } = req.params;
    const client = await ClientsRepository.findById(id);

    if (!client) {
      return res.status(404).json({ error: 'User not found' });
    }

    await ClientsRepository.delete(id);

    res.sendStatus(204);
  }
}

module.exports = new ClientController();
