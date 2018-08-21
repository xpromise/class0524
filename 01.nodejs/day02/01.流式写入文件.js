/*
  流式写入文件：
    fs.createWriteStream(file[, options])
      flags <string>  默认为 'w'。  要对文件进行操作
      encoding <string> 默认为 'utf8'。 写入文件的编码方式
      fd <number> 默认为 null。  文件描述符
      mode <number> 默认为 0o666。 设置文件的权限
      autoClose <boolean> 默认为 true。 当调用clos/end方法时，会自动关闭可写流
      start <number>  写入文件的起始位置
 */

//引入fs模块
var fs = require('fs');

//创建一个可写流
var ws = fs.createWriteStream('test1.txt');

//绑定事件
ws.on('open', function () {
  console.log('可写流打开了~~');
})

ws.on('close', function () {
  console.log('可写流关闭了~~');
})

//写入内容
ws.write('锄禾日当午');
ws.write('汗滴禾下土');
ws.write('谁知盘中餐');
ws.write('粒粒皆辛苦');

//关闭可写流
// ws.close();
ws.end();