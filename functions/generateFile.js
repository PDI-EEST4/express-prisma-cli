const fs = require('fs');
const path = require('path');

/**
 * Generate a file from a template
 * @param {String} name - Name of the resource
 * @param {String} template - Name of the template
 * @param {String} location - Location of the file
 */
function generateFile(name, template, location) {
  // Ensure we use the correct template path inside the node-cli package
  const templatePath = path.join(__dirname, '../templates', template);

  // Check if the template exists before reading
  if (!fs.existsSync(templatePath)) {
    console.error(`❌ Template not found: ${templatePath}`);
    return;
  }

  const content = fs.readFileSync(templatePath, 'utf8')
    .replace(/{{resourceName}}/g, name)
    .replace(/{{resourceNameLower}}/g, name.toLowerCase());

  fs.mkdirSync(path.dirname(location), { recursive: true });
  fs.writeFileSync(location, content);
  console.log(`✅ File created: ${location}`);
}

module.exports = generateFile;
