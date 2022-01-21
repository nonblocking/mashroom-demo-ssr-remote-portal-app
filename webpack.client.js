
const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV !== 'development';

const plugins = [];
if (!isProd) {
    plugins.push(new HtmlWebpackPlugin({
        inject: 'head',
        template: path.resolve(__dirname, '../../src/frontend/index.html'),
    }));
    plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
    plugins.push(new HtmlWebpackPlugin({
        inject: 'head',
        template: path.resolve(__dirname, 'src/frontend/index.html'),
    }));
}

module.exports = merge(common(isProd), {
    entry: {
        bundle: isProd ?
            './src/frontend' :
            ['webpack-hot-middleware/client?reload=true', 'react-hot-loader/patch', './src/frontend'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist/frontend'),
        publicPath: '/',
    },
    target: ['web', 'es5'],
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? undefined : 'eval-source-map',
    plugins,
});
