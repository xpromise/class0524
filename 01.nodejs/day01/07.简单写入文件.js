/*
  fs 简单写入文件
    - fs.writeFile(file, data[, options], callback)
      - file 要写入的文件路径
      - data 要写入的数据
      - options 可选的，默认值
        - encoding  'utf8'  写入文件的内容的编码方式
        - mode   0o666     设置文件权限，可读可写的权限
          - 0o111 代表文件可执行的权限
          - 0o222 代表文件可写入的权限
          - 0o444 代表文件可读取的权限
        - flag   ’w'  要对文件进行的操作 'w' 写入 'r' 读取 'a' 追加
      - callback 回调函数
        - err  错误对象（错误优先机制）
 */

//引入模块
var fs = require('fs');

//简单写入文件 - 小文件
fs.writeFile('test2.txt', '汗滴禾下土', {encoding: 'utf8', mode: 0o666, flag: 'a'}, function (err) {
  if (!err) {
    //没有错误
    console.log(err);  //null 没有发生错误
  } else {
    //产生了错误 err就是一个对象
    console.log(err);
  }
})