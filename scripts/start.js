'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const webpackDevServer = require('webpack-dev-server');
const paths = require('../config/paths');
const webpack = require('webpack');
const devServerConfig = require('../config/webpackDevServer.config');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const config = require('../config/webpack.dev.js');
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const appName = require(paths.appPackageJson).name;

//const serverConfig = devServerConfig(proxyConfig, lanUrlForConfig);

let compiler = webpack(config);
const devServer = new webpackDevServer(compiler);

// Launch WebpackDevServer.
devServer.listen(DEFAULT_PORT, HOST, err => {
    if (err) {
      return console.log(err);
    }
    // if (isInteractive) {
    //   clearConsole();
    // }
    console.log('Starting the development server...\n');
   // openBrowser(urls.localUrlForBrowser);
  });

