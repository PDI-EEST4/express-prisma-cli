const fs = require('fs');
const path = require('path');

const createIndexFile = require('./functions/createIndexFile');
const generateFile = require('./functions/generateFile');
const updatePrismaScheme = require('./functions/updatePrismaScheme');
const updateRoutesIndex = require('./functions/updateRoutesIndex');

function startApp() {
    console.log('🚀 Starting the app...');

    // Install necesary dependencies
    console.log('📦 Installing dependencies...');
    const installCommand = 'npm install express mysql2 dotenv @prisma/client';
    require('child_process').execSync(installCommand, { stdio: 'inherit' });

    // Create the index.js file
    console.log('🆕 Creating index.js file...');
    createIndexFile();

    // Ensure necessary directories exist before writing files
    const prismaDir = path.join(process.cwd(), 'prisma');
    const routesDir = path.join(process.cwd(), 'routes');

    if (!fs.existsSync(prismaDir)) {
        fs.mkdirSync(prismaDir, { recursive: true });
        console.log('📂 Created prisma/ directory');
    }

    if (!fs.existsSync(routesDir)) {
        fs.mkdirSync(routesDir, { recursive: true });
        console.log('📂 Created routes/ directory');
    }

    // Create the routes/index.js file
    console.log('🆕 Creating routes/index.js file...');
    const routesPath = path.join(routesDir, 'index.js');
    fs.writeFileSync(routesPath, `const express = require('express');\nconst router = express.Router();\n\nmodule.exports = router;\n`);

    // Create the prisma/schema.prisma file
    console.log('🆕 Creating prisma/schema.prisma file...');
    const schemaPath = path.join(prismaDir, 'schema.prisma');
    fs.writeFileSync(schemaPath, `generator client {\n  provider = "prisma-client-js"\n}\n\ndatasource db {\n  provider = "mysql"\n  url      = env("DATABASE_URL")\n}\n\n`);

    // Create the .env file
    console.log('🆕 Creating .env file...');
    const envPath = path.join(process.cwd(), '.env');
    fs.writeFileSync(envPath, 'PORT=3000\nDATABASE_URL="mysql://root:password@localhost:3306/databaseName"\n');

    // Create the .gitignore file
    console.log('🆕 Creating .gitignore file...');
    const gitignorePath = path.join(process.cwd(), '.gitignore');
    fs.writeFileSync(gitignorePath, 'node_modules\n.env\n');

    console.log('✅ Setup complete!');
    console.log('🆕 To create a new resource: node-cli create-resource ResourceName');
}

// Function to create a new resource
function createResource(name) {
    const files = [
        { template: 'controller.js', location: `controllers/${name}Controller.js` },
        { template: 'route.js', location: `routes/${name}Routes.js` },
        { template: 'repository.js', location: `repository/${name}Repository.js` },
        { template: 'service.js', location: `services/${name}Service.js` }
    ];

    files.forEach(({ template, location }) => {
        generateFile(name, template, path.join(process.cwd(), location));
    });

    updatePrismaScheme(name);
    updateRoutesIndex(name);
}

module.exports = { createResource, startApp };
