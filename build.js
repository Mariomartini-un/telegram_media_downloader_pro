// build.js - Concatenates modules into single userscript
const fs = require('fs');
const path = require('path');

const HEADER = fs.readFileSync('userscript.meta.js', 'utf8');
const MODULES = [
  'src/core/config.js',
  'src/core/logger.js',
  'src/utils/dom.js',
  'src/utils/crypto.js',
  'src/utils/fetch.js',
  'src/core/observer.js',
  'src/core/downloader.js',
  'src/ui/buttons.js',
  'src/ui/progress.js',
  'src/ui/settings.js',
  'src/main.js' // Entry point that wires everything
];

let output = HEADER + '\n\n(function() {\n\'use strict\';\n\n';

for (const mod of MODULES) {
  const content = fs.readFileSync(mod, 'utf8');
  output += `// === ${mod} ===\n${content}\n\n`;
}

output += '\n})(); // End IIFE\n';

// Write to dist/
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/telegram-downloader-pro.user.js', output);
console.log('✓ Built dist/telegram-downloader-pro.user.js');

// Optional: minify with terser if installed
// const { minify } = require('terser');
// minify(output).then(result => {
//   fs.writeFileSync('dist/telegram-downloader-pro.min.user.js', result.code);
//   console.log('✓ Built minified version');
// });