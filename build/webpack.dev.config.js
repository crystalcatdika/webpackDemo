const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config');

const PORT = parseInt(process.env.PORT) || 8688;
function resolve(dir) {
	return path.join(__dirname, '..', dir);
}

module.exports = merge(baseConfig, {
	entry: {
		app:'./src/index.js',
	},
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		// index.html 位置
		// host: '0.0.0.0',
		port: PORT,
		contentBase: resolve('/static'),
		hot: true,
		proxy: {
			'/api': {
				target: 'http://localhost:9000',
			},
		},
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			title: 'webpackDemo',
			filename: 'index.html',
			template: 'src/index.html',
			inject: true,
		}),
	]
});
