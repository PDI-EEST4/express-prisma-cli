const fs = require('fs');
const path = require('path');

/**
 * Updates or creates the `prisma/schema.prisma` file with a new model.
 * @param {String} name - The name of the new model.
 */
function updatePrismaSchema(name) {
    const prismaDir = path.join(process.cwd(), 'prisma');
    const schemaPath = path.join(prismaDir, 'schema.prisma');

    // Ensure the "prisma" directory exists
    if (!fs.existsSync(prismaDir)) {
        fs.mkdirSync(prismaDir, { recursive: true });
    }

    // If schema.prisma doesn't exist, create it with basic Prisma setup
    if (!fs.existsSync(schemaPath)) {
        const schemaTemplate = `generator client {
    provider = "prisma-client-js"
}

datasource db {
    provider = "mysql"
    url      = env("DATABASE_URL")
}

`;
        fs.writeFileSync(schemaPath, schemaTemplate);
        console.log(`🆕 Created prisma/schema.prisma`);
    }

    // Read existing schema content
    const schemaContent = fs.readFileSync(schemaPath, 'utf8');

    // Avoid adding duplicate models
    if (schemaContent.includes(`model ${name} {`)) {
        console.log(`⚠️ Model "${name}" already exists in schema.prisma`);
        return;
    }

    // Define new model
    const modelTemplate = `
model ${name} {
    id          String   @id @default(uuid())
    created_at  DateTime @default(now())
    // Define your fields here
}`;

    // Append the new model
    fs.appendFileSync(schemaPath, modelTemplate);
    console.log(`✅ Model "${name}" added to schema.prisma`);
}

module.exports = updatePrismaSchema;
