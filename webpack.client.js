
const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV !== 'development';

const plugins = [
    new HtmlWebpackPlugin({
        inject: 'head',
        template: path.resolve(__dirname, 'src/frontend/index.html'),
    }),
];
if (!isProd) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
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
    },
    target: ['web', 'es5'],
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? undefined : 'eval-source-map',
    plugins,
});
