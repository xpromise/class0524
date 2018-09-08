/*
  webpack的默认配置文件  webpack.config.js
 */
const {resolve} = require('path');
//引入插件模块
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const base = require('./webpack.base');
const merge = require('webpack-merge');

module.exports = merge(base, {
  //入口
  entry: ['./src/js/main.js', './src/index.html'],
  //输出
  output: {
    filename: './js/built.js',  //输出文件名称
    path: resolve(__dirname, '../build')     //文件的输出路径
  },
  //loader
  module: {
    rules: [  //放置loader规则
      {   //less less-loader css-loader style-loader
        test: /\.less$/,  //当前loader要处理的文件
        use: [{         //一旦遇见了指定文件，就执行use中的loader处理此文件   执行顺序都是从右到左
          loader: "style-loader" // 将js字符串的css代码，最终生成一个style标签插入到页面中
        }, {
          loader: "css-loader" // 将css转化成commonjs语法的模块，生成js字符串的css代码
        }, {
          loader: "less-loader" // 将less编译成css
        }]
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'  //加载html资源
        }
      }
    ]
  },
  //插件
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()  //热模替换要想生效，必须所有的资源通过指定loader加载
  ],
  //服务器  webpack-dev-server@2  webpack-dev-server@ -g
  devServer: {
    contentBase: './build',    //项目目录
    hot: true,    //开启热模替换、类似于热更新功能
    open: true,    //自动打开浏览器
    port: 3000,    //端口号
  },
})
