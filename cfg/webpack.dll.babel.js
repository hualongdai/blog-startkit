const webpack = require('webpack');
const path = require('path');
const BabiliPlugin = require('babili-webpack-plugin');

const library = '[name]_lib';

module.exports = {
    node: {
        fs: 'empty',
    },
    entry: {
        vendors: [
            'react',
            'react-dom',
            'react-router-dom',
            'koa-router',
            'mobx',
            'mobx-react',
            'axios',
            'antd',
        ],
    },
    output: {
        filename: '[name].dll.[hash].js',
        path: path.join(__dirname, '../public/'),
        library,
    },
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    module: {
        loaders: [{
            test: /\.(jsx|js)?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['env'],
            },
        }],
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '../public/[name]-manifest.json'),
            // This must match the output.library option above
            name: library,
        }),
        new BabiliPlugin(),
    ],

};
