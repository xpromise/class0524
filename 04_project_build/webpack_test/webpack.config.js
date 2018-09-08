/*
  webpack的默认配置文件  webpack.config.js
 */
const {resolve} = require('path');

module.exports = {
  //入口
  entry: './src/js/main.js',
  //输出
  output: {
    filename: './js/built.js',  //输出文件名称
    path: resolve(__dirname, 'build')     //文件的输出路径
  },
  //loader
  module: {
    rules: [  //放置loader规则
      {
        test: /\.less$/,  //当前loader要处理的文件
        use: [{         //一旦遇见了指定文件，就执行use中的loader处理此文件   执行顺序都是从右到左
          loader: "style-loader" // 将js字符串的css代码，最终生成一个style标签插入到页面中
        }, {
          loader: "css-loader" // 将css转化成commonjs语法的模块，生成js字符串的css代码
        }, {
          loader: "less-loader" // 将less编译成css
        }]
      }
    ]
  }
}