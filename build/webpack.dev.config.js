'use strict';
const webpack = require('webpack');
const merge = require('webpack-merge');
const os = require('os');
const HTMLPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config');
const path = require('path');

const host = (_ => {
  const ifaces = os.networkInterfaces();
  const ips = Object.values(ifaces).reduce((x, y) => x.concat(y), []);
  for (let i = 0; i < ips.length; i++) {
    const details = ips[i];
    if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
      return details.address;
    }
  }
  return false;
})() || '127.0.0.1';

module.exports = merge(baseConfig, {
  entry: {index: './src/index.js'},
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.resolve(__dirname, './', 'dist'),
  },
  devServer: {
    host: host,
    inline: true,
    quiet: true,
    hot: true, //热更新
    open: true, //打开游览器
    compress: true, //开发服务器是否启动gzip等压缩
    clientLogLevel: 'warning',
    port: '8021'
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/, // 忽略不用监听变更的目录
    aggregateTimeout: 500, // 防止重复保存频繁重新编译,500毫米内重复保存不打包
    poll: 1000 // 每秒询问的文件变更的次数
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new HTMLPlugin({ // 生成一个html页面，同时在webpack编译的时候。把我们所生成的entry都注入到这个html页面中,路径都是根据我们output配置的来走的。
      template: 'index.html',
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: false,
        removeAttributeQuotes: true //压缩 去掉引号
      },
      chunks: ['index']
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});
