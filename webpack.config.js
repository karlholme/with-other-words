const webpack = require('webpack');
const path = require('path');

const config = {
    entry: [
        'react-hot-loader/patch',
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'karlholme'),
        filename: 'bundle.js'
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
    ],
};

module.exports = config;
