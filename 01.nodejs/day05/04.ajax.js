var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/ajax', function (req, res) {
  console.log(req.query);
  res.send('这是ajax返回的响应~');
})

app.listen(3000, function (err) {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})