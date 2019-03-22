const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseConfig = require('./webpack.base.config');

function resolve(dir) {
	return path.join(__dirname, '..', dir);
}

module.exports = merge(baseConfig, {
	entry: {
		app:'./src/index.js',
	},
	mode: 'production',
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
	plugins: [
		new CleanWebpackPlugin(['dist'], {
			root: resolve(''),
		}),
		new HtmlWebpackPlugin({
			title: 'webpackDemo',
			filename: 'index.html',
			template: 'src/index.html',
			inject: true,
		}),
	],
});
