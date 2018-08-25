var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.post('/ajax', function (req, res) {
  console.log(req.body); // { username: 'sunwokong', password: '123123' }
  res.send('这是ajax返回的响应~');
})

app.listen(3000, function (err) {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})