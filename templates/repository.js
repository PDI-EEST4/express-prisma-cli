const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class {{resourceName}}Repository {
    static async findAll() {
        return await prisma.{{resourceNameLower}}.findMany();
    }

    static async findById(id) {
        return await prisma.{{resourceNameLower}}.findUnique({ where: { id } });
    }

    static async create(data) {
        return await prisma.{{resourceNameLower}}.create({ data });
    }

    static async update(id, data) {
        return await prisma.{{resourceNameLower}}.update({ where: { id }, data });
    }

    static async delete(id) {
        return await prisma.{{resourceNameLower}}.delete({ where: { id } });
    }
}

module.exports = {{resourceName}}Repository;
