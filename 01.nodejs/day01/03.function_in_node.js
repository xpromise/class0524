/*
  commonjs模块化中每一个模块都是包裹在一个函数中
  这个函数：
    function (exports, require, module, __filename, __dirname) {}
      exports: 暴露模块中内容
      require: 引入模块
      module: module.exports 暴露模块
      __filename  文件的绝对路径
      __dirname   文件夹的绝对路径
 */

console.log(arguments.callee.toString());

console.log(__filename);  // C:\Users\web\Desktop\class0524\01.nodejs\day01\03.function_in_node.js
console.log(__dirname);  // C:\Users\web\Desktop\class0524\01.nodejs\day01