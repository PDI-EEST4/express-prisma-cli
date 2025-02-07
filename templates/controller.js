const {{resourceName}}Service = require('../services/{{resourceName}}Service');

class {{resourceName}}Controller {
    static async getAll(req, res) {
        const data = await {{resourceName}}Service.getAll();
        res.json(data);
    }

    static async getById(req, res) {
        const data = await {{resourceName}}Service.getById(req.params.id);
        if (!data) return res.status(404).json({ error: '{{resourceName}} no encontrado' });
        res.json(data);
    }

    static async create(req, res) {
        const data = await {{resourceName}}Service.create(req.body);
        res.status(201).json(data);
    }

    static async update(req, res) {
        const data = await {{resourceName}}Service.update(req.params.id, req.body);
        res.json(data);
    }

    static async delete(req, res) {
        await {{resourceName}}Service.delete(req.params.id);
        res.status(204).send();
    }
}

module.exports = {{resourceName}}Controller;
