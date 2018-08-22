//引入http模块
var http = require('http');
//引入querystring模块，专门用来解析查询字符串
var querystring = require('querystring');

//创建一个服务
var server = http.createServer(function (request, response) {
  /*
    request 请求信息
    response 响应信息
   */
  //接受请求参数
  var query = request.url;
  console.log(query);  //   /?username=sunwukong&password=123456   查询字符串
  query = query.split('?');  //  [ '/', 'username=sunwukong&password=123456' ]
  console.log(query);
  query = query[1];
  query = querystring.parse(query);
  console.log(query);  //  { username: 'sunwukong', password: '123456' }
  
  //处理请求参数
  //设置响应头
  response.setHeader('Content-Type', 'text/html;charset=utf8');
  //返回响应给浏览器
  response.end('<h1>这是node服务器返回的响应</h1>');
})

//将服务监听一个端口号
server.listen(3000, function (err) {
  if (!err) console.log('服务器启动成功了~~');
  else console.log(err);
})