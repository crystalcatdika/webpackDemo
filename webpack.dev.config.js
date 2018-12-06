const webpack =require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');


module.exports = merge(baseConfig, {
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
