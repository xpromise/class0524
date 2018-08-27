var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/ajax', function (req, res) {
  res.send('这是ajax返回的响应~');
})

app.post('/ajax', function (req, res) {
  console.log(req.body); // { username: 'sunwokong', password: '123123' }
  res.send('这是ajax返回的响应~');
})

app.get('/jsonp', function (req, res) {
  //获取请求的参数
  var callback = req.query.callback;  //  'getData'
  //定义数据
  var data = {
    name: 'sunwukong',
    age: 18
  }
  //返回响应
  // jsonp  - json with padding
  res.send(callback + '(' + JSON.stringify(data) + ')');  // getData('{"name": "sunwukong","age": 18}')
})

app.get('/cors', function (req, res) {
  //设置一个响应头
  // res.set('Access-Control-Allow-Origin', '*');  //允许所有请求都能跨域
  res.set('Access-Control-Allow-Origin', 'http://localhost:63342');  //允许单个地址能够跨域
  res.send('这是ajax返回的响应~');
})

app.listen(3000, function (err) {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})