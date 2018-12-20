const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
	entry: {
		app:'./src/index.js',
	},
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		contentBase: './dist',
		hot: true,
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
