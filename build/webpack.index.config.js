const path =require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(baseConfig, {
  entry: {
    pc: './src/doubleOut/pc.js',
    mobile: './src/doubleOut/mobile.js',
  },
  output: {
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
  },
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, 'dist', 'pc.html'),
      template: 'src/doubleOut/pc.html',
      inject: true,
      chunks: ['pc'],
    }),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, 'dist', 'mobile.html'),
      template: 'src/doubleOut/mobile.html',
      inject: true,
      chunks: ['mobile'],
    }),
  ]
});
