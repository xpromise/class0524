//引入express模块
var express = require('express');
//创建应用对象
var app = express();
//设置路由
/*
  route:
    路由是指如何定义应用的端点（URIs）以及如何响应客户端的请求。
      1. 定义请求地址
      2. 接受请求、处理请求、返回响应
    路由是由一个 URI、HTTP 请求（GET、POST等）和若干个句柄组成的。
      1. URI  请求地址
      2. HTTP 请求（GET、POST、PUT、DELETE等） 请求方式
      3. 若干个句柄 一个或者多个回调函数
 */

app.get('/', function (req, res) {
  //localhost:3000
  /*
    req 请求信息
      req.params 获取请求路径占位符参数的
      req.query  获取查询字符串参数
      req.headers 获取请求头的信息
      req.get()   获取指定的请求头某个字段的信息
    res 响应信息
      res.download(文件的相对路径)  返回响应，将指定文件传输到客户端中，客户端自动下载
      res.sendFile(文件的绝对路径)  返回响应，将指定文件传输到客户端中，客户端自动打开显示

      res.end()   返回响应，返回快速的响应
      res.send()  返回响应，根据用户设置响应的内容，自动添加相应响应头
      res.json()  返回响应，将响应的内容转化为json字符串
      res.redirect()  返回响应，请求资源重新向，重定向到其他路由，设置响应状态码为302
      
      res.set()  设置响应头
      res.get()  获取响应头

      res.status()  设置响应状态码
   */
  
  // console.log(req.headers);
  // console.log(req.get('accept'));
  //注意：在服务器返回响应时，我们只能返回一次响应
  // res.send('这是服务器返回的响应');
  // res.download('./index.html');
  // res.sendFile(__dirname + '/index.html');
  
  // res.redirect('/shop/123456666');
  res.set('Content-type', 'text/html');
  console.log(res.get('Content-type'));
  
  res.status(404).end();
  
})

app.post('/', function (req, res) {
  
  res.send('这是服务器返回的响应');
})

app.get('/test', function (req, res) {
  //localhost:3000/test
  res.send('这是服务器返回的响应');
})

app.get('/shop/:id', function (req, res) {
  //localhost:3000/shop/123456
  console.log(req.params);  // { id: '123456' }
  res.send('这是服务器返回的响应' + req.params.id);
})

app.get(/\/food\/(\d+)/, function (req, res) {
  //localhost:3000/shop/123456
  console.log(req.params);  // { '0': '123123' }
  res.send('这是服务器返回的响应');
})

//监听端口号
app.listen(3000, function (err) {
  if (!err) console.log('服务器启动成功了~~');
  else console.log(err);
})