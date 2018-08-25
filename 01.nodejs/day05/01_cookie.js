var express = require('express');
//引入cookie-parser   解析请求头中的cookie，挂载到req.cookies上
var cookieParser = require('cookie-parser');
var app = express();
// 解析请求头中的cookie，挂载到req.cookies上
// app.use(cookieParser());

/*
  浏览器端通过 document.cookie 读/写二合一
 */


app.get('/cookie01', function (req, res) {
  //设置cookie
  /*
    res.cookie(字段名，字段值，配置对象)
   */
  res.cookie('username', 'sunwukong', {maxAge: 1000 * 3600 * 24 * 7});
  res.cookie('user_id', 'zhubajie', {maxAge: 1000 * 3600 * 24 * 7});
  //返回响应
  res.send('这是cookie01返回的响应');
})

app.get('/cookie02', cookieParser(), function (req, res) {
  //获取cookie
  console.log(req.cookies); // { username: 'sunwukong', user_id: 'zhubajie' }
  
  res.send('这是cookie02返回的响应');
})

app.get('/cookie03', function (req, res) {
  //修改
  // res.cookie('username', 'shawujing', {maxAge: 1000 * 3600 * 24 * 7});
  //删除
  // res.cookie('user_id', 'xx', {maxAge: 0});
  res.clearCookie('username');
  
  res.send('这是cookie03返回的响应');
})

app.listen(3000, function (err) {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})