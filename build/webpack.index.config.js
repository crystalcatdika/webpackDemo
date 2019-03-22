const path =require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseConfig = require('./webpack.base.config');

function resolve(dir) {
	return path.join(__dirname, '..', dir);
}

module.exports = merge(baseConfig, {
	entry: {
		pc: './src/doubleOut/pc.js',
		mobile: './src/doubleOut/mobile.js',
	},
	output: {
		filename: 'js/[name].[chunkhash].js',
		chunkFilename: 'js/[name].[chunkhash].js',
	},
	mode: 'production',
	plugins: [
		new CleanWebpackPlugin(['dist'], {
			root: resolve(''),
		}),
		new HtmlWebpackPlugin({
			filename: path.join(resolve(''), 'dist', 'pc.html'),
			template: 'src/doubleOut/pc.html',
			inject: true,
			chunks: ['pc'],
		}),
		new HtmlWebpackPlugin({
			filename: path.join(resolve(''), 'dist', 'mobile.html'),
			template: 'src/doubleOut/mobile.html',
			inject: true,
			chunks: ['mobile'],
		}),
	]
});
