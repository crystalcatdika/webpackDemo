const path = require('path');
const { NODE_ENV } = require('./common');

const rootPath = path.join(__dirname, '../');
const PATH = {
	development: {
		ROOT: rootPath,
		STATIC: path.join(rootPath, 'static'),
	},
	preproduction: {
		ROOT: rootPath,
		STATIC: path.join(rootPath, 'dist'),
	},
	production: {
		ROOT: rootPath,
		STATIC: path.join(rootPath, 'dist'),
	},
};

module.exports = Object.freeze({ PATH: PATH[NODE_ENV] });
