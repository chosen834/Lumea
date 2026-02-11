// build.js
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Folders
const productsFolder = path.join(__dirname, 'data/products');
const outputFile = path.join(__dirname, 'data/products.json');

// Read all .yml files
const files = fs.readdirSync(productsFolder).filter(f => f.endsWith('.yml'));

const products = files.map(file => {
  const content = fs.readFileSync(path.join(productsFolder, file), 'utf8');
  return yaml.load(content);
});

// Write combined JSON
fs.writeFileSync(outputFile, JSON.stringify(products, null, 2));
console.log('✅ products.json generated successfully!');