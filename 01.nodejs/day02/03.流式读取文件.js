/*
  fs.createReadStream(path[, options])
    - path
    - options
      flags <string> 详见支持的文件系统flag。默认为 'r'。
      encoding <string> 默认为 null。
      fd <integer> 默认为 null。
      mode <integer> 默认为 0o666。
      autoClose <boolean> 默认为 true。
      start <integer>
      end <integer> 默认为 Infinity。 读取文件的最大位置
      highWaterMark <integer> 默认为 64 * 1024。 每次读取文件的大小 64kb
 */

var fs = require('fs');
//创建一个可读流
var rs = fs.createReadStream('C:\\Users\\web\\Desktop\\简单读取文件.avi');
//创建一个可写流
var ws = fs.createWriteStream('./movie.avi');

//绑定事件
rs.once('open', function () {
  console.log('可读流打开了~~');
})

rs.once('close', function () {
  console.log('可读流关闭了~~');
  //可读流关闭，说明所有数据读取完毕并且写入了
  //关闭可写流
  ws.end();
})

ws.once('open', function () {
  console.log('可写流打开了~~');
})

ws.once('close', function () {
  console.log('可写流关闭了~~');
})

//当创建一个可读流的时候，就会开始读取文件，每次读取完成的时候，会触发一个事件 data
rs.on('data', function (data) {
  // console.log(data);
  // console.log(data.length);
  //将每次读取的数据写入到文件中
  ws.write(data);
})

