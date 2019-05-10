'use strict';
const pkg = require('../package.json');
const path = require('path');
module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../', 'src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader']},
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1,
            name: pkg.version + '/asset/imgs/[name].[ext]?v=[hash:7]'
          }
        },
      },
      {
        test: /\.(mp3|mp4)$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            fallback: 'file-loader',
            limit: 10000,
            name: pkg.version + '/asset/videos/[name].[ext]?v=[hash:7]'
          }
        },
      }
    ]
  }
};