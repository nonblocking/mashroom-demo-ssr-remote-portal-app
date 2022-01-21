const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (extractCss) => ({
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    'sass-loader',
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    plugins: extractCss ? [
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        })
    ] :
    []
});
