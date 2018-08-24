/*
  ejs  一个js模板引擎
 */
var express = require('express');
var app = express();
//配置模板资源目录
app.set('views', './views');
//配置使用哪种模板引擎
app.set('view engine', 'ejs');

app.get('/ejs', function (req, res) {
  var data = {
    username: '<p>sunwukong</p>',
    age: 18
  }
  //返回响应，将数据渲染到页面上
  /*
    res.render('模板资源名称（可以省略扩展名）', {要渲染的数据})
   */
  res.render('index', {data: data})
})


app.listen(3000, function (err) {
  if (!err) console.log('服务器启动成功了~~');
  else console.log(err);
})

