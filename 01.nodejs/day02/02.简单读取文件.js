/*
  简单读取文件
    fs.readFile(path[, options], callback)
      - path 文件路径
      - options 可选值，默认值
        - encoding
        - flag
      - callback 回调函数
        - err 错误对象
        - data 读取文件的内容, 返回是一个buffer数据
 */

var fs = require('fs');

fs.readFile('test1.txt', function (err, data) {
  //处理错误
  if (!err) {
    console.log(data.toString());
  } else {
    //发生了错误
    console.log(err);
  }
})