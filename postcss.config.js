'use strict';
module.exports = {
  plugins: [
    require("autoprefixer")({browsers: ["last 5 versions"]}),//括号可写需要在哪个版本要自动添加前缀
    // require('postcss-pxtorem')({rootValue: 75, propList: ['*', '!letter-spacing']}),
  ]
};