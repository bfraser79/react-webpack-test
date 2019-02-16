'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const paths = require('../config/paths');
const fs = require('fs-extra');
const webpack = require('webpack');

fs.emptyDirSync(paths.appBuild);
copyPublicFolder();

const config = require('../config/webpack.prod.js');

let compiler = webpack(config);

build().then((msg) => {
  console.log(msg);
  console.log('finished');
});

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml
  });
}

function build() {
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      let messages;

      if (err) {
        if (!err.message) {
          return reject(err);
        } else {
          return reject(err.message);
        }
      } else {
        messages = stats.toJson({ all: false, warnings: true, errors: true });
        return resolve(messages);
      }
    });
  });
}