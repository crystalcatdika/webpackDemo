const path = require('path');
const webpack = require('webpack');
const NEVCON = require('../config');

function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = {
	output: {
		path: resolve('dist'),
		filename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
					formatter: require('eslint-formatter-friendly')
				},
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.css$/,
				use:
            ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			}
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			NEVCONFIG: JSON.stringify(NEVCON),
		}),
	],
};
