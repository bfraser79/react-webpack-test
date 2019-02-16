const merge = require('webpack-merge');
const paths = require('./paths');
const common = require('./webpack.common');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');


module.exports = merge(common, {
    mode: 'development',
    plugins: [new CaseSensitivePathsPlugin()],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './build'
    },
    module: {
        rules: [{
            oneOf: [
                // Process application JS with Babel.
                // The preset includes JSX, Flow, TypeScript, and some ESnext features.
                {
                    test: /\.(js|mjs|jsx|ts|tsx)$/,
                    include: paths.appSrc,
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            [
                                'babel-plugin-named-asset-import',
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
                // Process any JS outside of the app with Babel.
                // Unlike the application JS, we only compile the standard ES features.

                {
                    test: /\.(js|mjs)$/,
                    exclude: /@babel(?:\/|\\{1,2})runtime/,
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        configFile: false,
                        compact: false,
                        //presets: [require('@babel/preset-env').default],
                        cacheDirectory: true,
                        cacheCompression: false,

                        // If an error happens in a package, it's possible to be
                        // because it was compiled. Thus, we don't want the browser
                        // debugger to show the original code. Instead, the code
                        // being evaluated would be much more helpful.
                        sourceMaps: false,
                    },
                },

                // "postcss" loader applies autoprefixer to our CSS.
                // "css" loader resolves paths in CSS and adds assets as dependencies.
                // "style" loader turns CSS into JS modules that inject <style> tags.
                // In production, we use MiniCSSExtractPlugin to extract that CSS
                // to a file, but in development "style" loader enables hot editing
                // of CSS.
                // By default we support CSS Modules with the extension .module.css
                {
                    test: /\.css$/,
                    exclude: /\.module\.css$/,
                    use: ['style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                sourceMap: false
                            }
                        }
                    ],
                    // Don't consider CSS imports dead code even if the
                    // containing package claims to have no side effects.
                    // Remove this when webpack adds a warning or an error for this.
                    // See https://github.com/webpack/webpack/issues/6571
                    sideEffects: true,
                },
                // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
                // using the extension .module.css
                {
                    test: /\.module\.css$/,
                    use: ['style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                sourceMap: false,
                                modules: true
                            }
                        }
                    ]
                },
                // Opt-in support for SASS (using .scss or .sass extensions).
                // By default we support SASS Modules with the
                // extensions .module.scss or .module.sass
                {
                    test: /\.(scss|sass)$/,
                    exclude: /\.module\.(scss|sass)$/,
                    use: ['style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2,
                                sourceMap: false
                            }
                        },
                        'sass-loader'
                    ],
                    // Don't consider CSS imports dead code even if the
                    // containing package claims to have no side effects.
                    // Remove this when webpack adds a warning or an error for this.
                    // See https://github.com/webpack/webpack/issues/6571
                    sideEffects: true,
                },
                //         // // Adds support for CSS Modules, but using SASS
                //         // // using the extension .module.scss or .module.sass
                {
                    test: /\.module\.(scss|sass)$/,
                    use: ['style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2,
                                sourceMap: false,
                                modules: true
                            }
                        }, 'sass-loader'
                    ]
                },
                // "file" loader makes sure those assets get served by WebpackDevServer.
                // When you `import` an asset, you get its (virtual) filename.
                // In production, they would get copied to the `build` folder.
                // This loader doesn't use a "test" so it will catch all modules
                // that fall through the other loaders.
                {
                    loader: 'file-loader',
                    // Exclude `js` files to keep "css" loader working as it injects
                    // its runtime that would otherwise be processed through "file" loader.
                    // Also exclude `html` and `json` extensions so they get processed
                    // by webpacks internal loaders.
                    exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                    options: {
                        name: 'static/media/[name].[hash:8].[ext]',
                    },
                }
                // ** STOP ** Are you adding a new loader?
                // Make sure to add the new loader(s) before the "file" loader.
            ]
        }]
    }
});