/* eslint-disable */
const fs = require('fs');
const path = require('path');

const generate = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
      if (file[0] === file[0].toUpperCase()) console.log(`export { default as ${file} } from './${file}';`);
  });
};

generate(path.join(__dirname, '../src/components/'));