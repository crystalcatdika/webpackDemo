const path = require('path');
const NEVCON = require('../config');
const webpack =require('webpack');

module.exports = {
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
    },
    module: {
        rules: [
             {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                },
             },
            {
                test: /\.css$/,
                use:
                    [
                        'style-loader',
                        'css-loader'
                    ],
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
