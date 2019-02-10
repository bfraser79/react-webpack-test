const HtmlWebPackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html'
});

module.exports = function(env) {
  return {
    output: {
      path: paths.appBuild
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    plugins: [htmlPlugin]
  };
};
