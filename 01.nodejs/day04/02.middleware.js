var express = require('express');
//引入模块
var bodyParser = require('body-parser');
var app = express();
/*
  中间件：
    是什么？  就是一个函数
      中间件默认接受处理所有请求
    组成： 请求对象request、响应对象response、next调用堆栈中的下一个中间件
    作用：
      1. 执行任意代码。
      2. 修改请求/响应对象
      3. 接受请求、处理请求、返回响应
      4. 调用堆栈中的下一个中间件
    应用：
      1. 应用级中间件
        修改请求/响应对象、过滤非法请求...
      2. 内置中间件
        express.static('文件目录')
        服务器默认所有内容对外不可见的
        内置中间件可以向外暴露出去一些静态资源，用户可以直接访问
      3. 第三方中间件
        其他程序员开发好的中间件，下载安装就可以直接使用
        修改请求/响应对象  body-parser  cookie-parser
      4. 错误处理中间件
        处理服务器产生的错误
        必须传入4个参数，才能作为错误处理中间件解析
      5. 路由器中间件
        分类管理所有路由
        
      所有的路由和中间件最终都会被添加到一个数组中，
        当请求进来时，遍历这个数组找到对应匹配的路由或者中间件去响应（调用相应的回调函数）,默认响应到此为止
        除非回调函数中调用了next方法，此时才会接下来继续遍历查找
        
 */
//定义中间件
//内置中间件
app.use(express.static('./public'));

//第三方中间件
//解析post请求请求体中的参数，将其挂载到req.body上
app.use(bodyParser.urlencoded({extended: true}));

//应用级的中间件
/*app.use(function (req, res, next) {
  console.log('中间件处理好的请求');
  console.log(req.query);
  // 修改请求/响应对象
  // 在同一次请求，所有的中间件和路由共享同一个req/res
  req.query.middleware = 'xxxx';
  // 过滤非法请求
  if (req.headers.host !== 'localhost:3000') {
    res.end('error');
    return;
  }
  
  next();
})*/

function middleware(req, res, next) {
  console.log('中间件处理好的请求');
  console.log(req.query);
  // 修改请求/响应对象
  // 在同一次请求，所有的中间件和路由共享同一个req/res
  req.query.middleware = 'xxxx';
  // 过滤非法请求
  if (req.headers.host !== 'localhost:3000') {
    res.end('error');
    return;
  }
  
  next();
}

app.get('/', middleware, function (req, res, next) {
  console.log('根路由处理好的请求');
  
  console.log(req.query);
  
  res.send('这是根路由返回的响应');
})

app.post('/', function (req, res, next) {
  console.log(req.body);  // undefined  { username: 'admin', pwd: '123123' }
  res.send('这是post路由返回的响应');
})

app.get('/error', function (req, res) {
  //抛出异常错误
  throw new Error('这里访问出错了~~~');
})

//错误处理中间件
app.use(function (err, req, res, next) {
  //err错误对象
  console.log(err);
  res.send('访问出错了~~~');
})


app.listen(3000, function (err) {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})