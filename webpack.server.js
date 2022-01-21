
const fs = require('fs');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const {merge} = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common(true), {
    entry: {
        index: './src/server',
        ssr:  './src/server/ssr',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/server'),
        library: {
            type: 'commonjs',
        },
    },
    externals: [nodeExternals()],
    target: 'node',
    mode: 'none'
});
