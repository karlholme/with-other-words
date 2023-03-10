const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
    entry: [
        'react-hot-loader/patch',
        './src/index.js'
    ],
    output: {
        path: __dirname + '/karlholme',
        filename: '[contenthash].bundle.js'
    },
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.(s(a|c)ss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }, {
                test: /\.mp3$/,
                loader: 'file-loader'
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: './dist'
        },
        historyApiFallback: true,
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: 'lodash',
        }),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
};

module.exports = config;
