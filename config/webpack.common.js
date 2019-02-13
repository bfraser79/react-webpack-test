const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
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
                    options: {
                        eslintPath: require.resolve('eslint')
                    },
                    loader: require.resolve('eslint-loader')
                }],
                include: paths.appSrc
            },
            {
                oneOf: [
                    // Process application JS with Babel.
                    // The preset includes JSX, Flow, TypeScript, and some ESnext features.
                    {
                        test: /\.(js|mjs|jsx|ts|tsx)$/,
                        include: paths.appSrc,
                        loader: require.resolve('babel-loader'),
                        options: {
                            plugins: [
                                [
                                    require.resolve('babel-plugin-named-asset-import'),
                                    {
                                        loaderMap: {
                                            svg: {
                                                ReactComponent: '@svgr/webpack?-prettier,-svgo![path]'
                                            }
                                        }
                                    }
                                ]
                            ],
                            // This is a feature of `babel-loader` for webpack (not Babel itself).
                            // It enables caching results in ./node_modules/.cache/babel-loader/
                            // directory for faster rebuilds.
                            cacheDirectory: true,
                            cacheCompression: false,
                            compact: false
                        }
                    },
                ]
            }
        ]
    }
};