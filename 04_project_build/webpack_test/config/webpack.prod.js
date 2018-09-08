/*
  webpack的默认配置文件  webpack.config.js
 */
const {resolve} = require('path');
//引入插件模块
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CleanCSSPlugin = require("less-plugin-clean-css");
const webpack = require('webpack');
const base = require('./webpack.base');
const merge = require('webpack-merge');

module.exports = merge(base, {
  //入口
  entry: './src/js/main.js',
  //输出
  output: {
    filename: './js/[name].[hash:7].js',  //输出文件名称
    path: resolve(__dirname, '../dist')     //文件的输出路径
  },
  //loader
  module: {
    rules: [  //放置loader规则
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader", {   // postcss-loader 扩展前缀，配置外面postcss.config.js文件使用
            loader: "less-loader",
            options: {
              plugins: [
                new CleanCSSPlugin({ advanced: true })  //压缩css代码
              ]
            }
          }]
        })
      }
    ]
  },
  //插件
  plugins: [
    new ExtractTextPlugin("./css/[name].[hash:7].css"),
    new HtmlWebpackPlugin({   //以指定文件为模板创建新的html文件，新的文件内会自动引入打包生成的css和js
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new CleanWebpackPlugin('dist', {   //清除指定目录下所有的文件
      root: resolve(__dirname, '../')
    }),
    new webpack.optimize.UglifyJsPlugin({ //压缩js代码
      sourceMap: true
    }),
    new webpack.optimize.CommonsChunkPlugin({  //用来提取公共的模块保存
      name: 'vendor',
      minChunks: 2     //当模块被import引入了两次，就会被提前成单独的js模块打包
    })
  ],
  //为了检索压缩后的文件产生错误，有了它就能提示正确的错误函数名/变量名
  devtool: 'source-map'
})

/*
  tree shaking
    去除无用js的代码
 */