
var fs = require('fs');
//创建一个可读流
var rs = fs.createReadStream('C:\\Users\\web\\Desktop\\简单读取文件.avi');
//创建一个可写流
var ws = fs.createWriteStream('./movie.avi');

//自动将可读流读取的数据塞入到可写流中
//当我可读流关闭时，会自动关闭可写流
rs.pipe(ws);

