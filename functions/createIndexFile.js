const fs = require('fs');
const path = require('path');

/**
 * Creates the index.js file
 */
function createIndexFile() {
  const indexPath = path.join(process.cwd(), 'index.js');

  if (fs.existsSync(indexPath)) {
    console.log('⚠️ index.js already exists. Skipping...');
    return;
  }

  const content = `const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const router = require('./routes/index');

app.use('/', router);

app.listen(port, () => console.log('Server running on port', port));
`;

  fs.writeFileSync(indexPath, content);
}

module.exports = createIndexFile;