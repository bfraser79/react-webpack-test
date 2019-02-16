const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const paths = require('./paths');

const htmlWebPackPlugin = new HtmlWebPackPlugin({
    template: './public/index.html',
    filename: './index.html',
    title: 'Production'
});

const forkTsCheckerWebpackPlugin = new ForkTsCheckerWebpackPlugin({
    async: false,
    checkSyntacticErrors: true,
    tsconfig: paths.appTsConfig,
    compilerOptions: {
      module: 'esnext',
      moduleResolution: 'node',
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: 'preserve',
    },
    reportFiles: [
      '**',
      '!**/*.json',
      '!**/__tests__/**',
      '!**/?(*.)(spec|test).*',
      '!**/src/setupProxy.*',
      '!**/src/setupTests.*',
    ],
    watch: paths.appSrc,
    silent: true
  })


module.exports = {
    entry: [
        './src/index.tsx'
    ],
    output: {
        path: paths.appBuild
    },
    resolve: {
        extensions: ['.web.mjs',
            '.mjs',
            '.web.js',
            '.js',
            '.web.ts',
            '.ts',
            '.web.tsx',
            '.tsx',
            '.json',
            '.web.jsx',
            '.jsx',
        ]
    },
    plugins: [htmlWebPackPlugin, forkTsCheckerWebpackPlugin],
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