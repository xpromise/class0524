//引入express模块
var express = require('express');
//创建应用对象
var app = express();
//设置路由
app.get('/', function (request, response) {
  //获取请求参数
  //express会自动解析查询字符串参数，将其解析成一个对象，挂载到request.query上
  console.log(request.query);  // { username: 'sunwukong', password: '123456' }
  //返回响应
  response.send('<h1>这是express服务器返回的响应</h1>');
})
//监听端口号，开启服务器
app.listen(3000, function (err) {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})