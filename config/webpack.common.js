const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('./paths');

const htmlWebPackPlugin = new HtmlWebPackPlugin({
    template: './public/index.html',
    filename: './index.html',
    title: 'Production'
});



module.exports = {
    entry: [
        './src/index.tsx'
    ],
    output: {
        path: paths.appBuild
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [htmlWebPackPlugin],
    module: {
        rules: [
            // Disable require.ensure as it's not a standard language feature.
            {
                parser: {
                    requireEnsure: false
                }
            },
            // First, run the linter.
            // It's important to do this before Babel processes the JS.
            {
                test: /\.(js|mjs|jsx)$/,
                enforce: 'pre',
                use: [{
                    loader: 'eslint-loader'
                }],
                include: paths.appSrc
            },
            {
                test: /\.(js|mjs|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};