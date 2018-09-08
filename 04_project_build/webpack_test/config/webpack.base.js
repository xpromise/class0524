/*
  webpack的默认配置文件  webpack.config.js
 */
const {resolve} = require('path');
//引入插件模块
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //loader
  module: {
    rules: [  //放置loader规则
      {   //file-loader url-loader
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,    //将图片大小为8kb以下的做base64处理，图片资源的优化
              publicPath: '../images',  //决定src/url属性文件的路径
              outputPath: './images',   //决定文件输出的路径
              name: '[hash:7].[ext]'   //重命名图片文件，hash文件名， ext文件扩展名
            }
          }
        ]
      },
      {   //jshint  jshint-loader
        test: /\.js$/, // 涵盖 .js 文件
        enforce: "pre", // 预先加载好 jshint loader
        exclude: /node_modules/, // 排除掉 node_modules 文件夹下的所有文件
        include: [resolve(__dirname, 'src/js')],   //指定检查文件路径
        use: [
          {
            loader: "jshint-loader",
            options: {
              //jslint 的错误信息在默认情况下会显示为 warning（警告）类信息
              //将 emitErrors 参数设置为 true 可使错误显示为 error（错误）类信息
              emitErrors: true,
    
              //jshint 默认情况下不会打断webpack编译
              //如果你想在 jshint 出现错误时，立刻停止编译
              //请设置 failOnHint 参数为true
              failOnHint: true,
              esversion: 6   //声明使用es6语法
            }
          }
        ]
      },
      /*{   // babel-loader@8.0.0-beta.0 @babel/core @babel/preset-env
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }*/
      {   // babel-preset-es2015  babel-loader@7 babel-core
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', {sourceType: 'module'}]  // {sourceType: 'module'} 让babel不转换es6模块化语法
          }
        }
      }
    ]
  },
  //插件
  plugins: [
    new HtmlWebpackPlugin({   //以指定文件为模板创建新的html文件，新的文件内会自动引入打包生成的css和js
      template: './src/index.html'
    })
  ]
}