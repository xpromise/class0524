//引入express模块
var express = require('express');
//创建应用对象
/*
  express最主要的对象，我们要保证应用对象是唯一的
 */
var app = express();
//设置路由（设置接受请求、处理请求、返回响应的方法 --- 业务逻辑）
/*
    http://localhost:3000    localhost : 本机默认域名
    http://127.0.0.1:3000    127.0.0.1 : 本机默认ip地址
    http://192.168.17.53:3000  192.168.17.53 : 本机在局域网中的ip地址
    
    万维网会给每一台设备分配一个ip地址
    但是ip地址记不住，所以才会有域名的诞生，域名就是为了简化ip地址
      DNS解析，解析域名地址为ip地址
    https://www.baidu.com/     www.baidu.com 域名地址
   
    默认资源名 index.html
    
    默认端口号
      http    80
      https  443
 */
app.get('/', function (request, response) {
  //获取请求参数
  //express会自动解析查询字符串参数，将其解析成一个对象，挂载到request.query上
  console.log(request.query);  // { username: 'sunwukong', password: '123456' }
  //返回响应
  response.send('<h1>这是express服务器get返回的响应</h1>');
})
app.post('/', function (request, response) {
  //返回响应
  response.send('<h1>这是express服务器post返回的响应</h1>');
})
//监听端口号，开启服务器
app.listen(80, function (err) {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})