/*
  webpack的默认配置文件  webpack.config.js
 */
const {resolve} = require('path');
//引入插件模块
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
     /* {   //less less-loader css-loader style-loader
        test: /\.less$/,  //当前loader要处理的文件
        use: [{         //一旦遇见了指定文件，就执行use中的loader处理此文件   执行顺序都是从右到左
          loader: "style-loader" // 将js字符串的css代码，最终生成一个style标签插入到页面中
        }, {
          loader: "css-loader" // 将css转化成commonjs语法的模块，生成js字符串的css代码
        }, {
          loader: "less-loader" // 将less编译成css
        }]
      },*/
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "less-loader"]
        })
      },
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
      }
    ]
  },
  //插件
  plugins: [
    new ExtractTextPlugin("./css/styles.css"),
  ]
}