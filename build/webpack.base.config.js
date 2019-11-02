const path = require('path');
const webpack = require('webpack');
const NEVCON = require('../config');

// dist生成在root
function resolve(dir) {
	return path.join(__dirname, `../${dir}`);
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
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true,
						},
					},
				],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						publicPath: './images/',
						outputPath: './images/'
					}
				}
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
