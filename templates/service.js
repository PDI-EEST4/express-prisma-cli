const {{resourceName}}Repository = require('../repository/{{resourceName}}Repository');

class {{resourceName}}Service {
    static async getAll() {
        return await {{resourceName}}Repository.findAll();
    }

    static async getById(id) {
        return await {{resourceName}}Repository.findById(id);
    }

    static async create(data) {
        return await {{resourceName}}Repository.create(data);
    }

    static async update(id, data) {
        return await {{resourceName}}Repository.update(id, data);
    }

    static async delete(id) {
        return await {{resourceName}}Repository.delete(id);
    }
}

module.exports = {{resourceName}}Service;
