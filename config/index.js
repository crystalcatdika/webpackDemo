const fs = require('fs');
const path = require('path');

const config = {};
fs.readdirSync(__dirname).forEach((fileName) => {
  if (path.join(__dirname, fileName) !== __filename) {
    Object.assign(config, require(`${__dirname}/${fileName}`));
  }
});

module.exports = config;
