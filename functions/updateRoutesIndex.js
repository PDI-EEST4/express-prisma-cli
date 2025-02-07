const fs = require('fs');
const path = require('path');

/**
 * Updates or creates the `routes/index.js` file with a new route.
 * @param {String} name 
 * @returns 
 */
function updateRoutesIndex(name) {
    const routesPath = path.join(process.cwd(), 'routes', 'index.js');

    // If the file doesn't exist, create it with a basic structure
    if (!fs.existsSync(routesPath)) {
        fs.writeFileSync(routesPath, `const express = require('express');\nconst router = express.Router();\n\nmodule.exports = router;\n`);
    }

    // Read the current file
    let contenido = fs.readFileSync(routesPath, 'utf8');

    // Check if the route is already in the file
    if (contenido.includes(`require('./${name}Routes')`)) {
        console.log(`⚠️ Route for ${name} is already in routes/index.js`);
        return;
    }

    // Add the import and route
    contenido = contenido.replace(
        "const router = express.Router();",
        `const router = express.Router();\nconst ${name}Routes = require('./${name}Routes');`
    );

    contenido = contenido.replace(
        "module.exports = router;",
        `router.use('/${name.toLowerCase()}', ${name}Routes);\n\nmodule.exports = router;`
    );

    fs.writeFileSync(routesPath, contenido);
    console.log(`✅ Route added for ${name} to routes/index.js`);
}

module.exports = updateRoutesIndex;