/*
  Buffer ：
    - 创建Buffer方式：
      1. new Buffer(size);  废弃了
      2. Buffer.allocUnsafe(size) 创建一个可能包含敏感数据的buffer
        - 不安全的，可能包含敏感数据
        - 性能最好的
      3. Buffer.alloc(size) 创建一个纯净的buffer
        - 安全的，不包含敏感数据
        - 性能稍差
      4. Buffer.from(string) 将字符串转化成二进制数据保存在buffer
 */

// var buf = new Buffer(10);
// console.log(buf);

// var buf = Buffer.allocUnsafe(10);
// console.log(buf);
// buf.fill(0);  //全部填充为0
// console.log(buf);

/*
  显示的是16进制
    00  -  ff
    0   -  255
    00000000 - 11111111
    
    1 byte = 8 bit
    1 kb = 1024 byte
    1 mb = 1024 kb
 */

// var buf = Buffer.alloc(10);
// console.log(buf);

// var buf = Buffer.from('hello atguigu');
// console.log(buf);
// console.log(buf.toString());
// console.log(buf.length);
// console.log(buf[0]);
// buf.forEach(function (item, index) {
//   console.log(item, index);
// })

/*
  英文字母 占 1个字节
  中文  占 3个字节
 */

var buf = Buffer.from('尚硅谷');
console.log(buf);