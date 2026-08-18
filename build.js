

const fs = require('fs');
const path = require('path');

const APP_ENV = process.env.APP_ENV || 'development';

const templatePath = path.join(__dirname, 'src', 'index.html');
const template = fs.readFileSync(templatePath, 'utf8');

const output = template.replace(/{{ENV}}/g, APP_ENV);

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const outputPath = path.join(distDir, 'index.html');
fs.writeFileSync(outputPath, output, 'utf8');

console.log(`Build complete. Target environment: ${APP_ENV}`);
console.log(`Output written to: ${outputPath}`);
