var express = require('express');
require('./db');
//引入Cities
var Cities = require('./model/Cities');
var app = express();


app.use(express.static('public'));

//接受请求，返回所有省份的信息
app.get('/getProvince', function (req, res) {
  //去数据库中找所有省份的信息
  Cities.find({level: 1}, {province: 1, name: 1, _id: 0}, function (err, data) {
    if (!err && data.length) {
      //数据找到了
      res.send({status: 'ok', data: data});
    } else {
      //方法出错了或者数据没找到
      res.send({status: 'error'});
    }
  })
})

//接受请求，返回指定省份所有城市的信息
app.get('/getCity', function (req, res) {
  //获取请求参数
  var province = req.query.province;
  //为了减少数据库的操作
  if (!province) {
    res.send({status: 'error'});
    return;
  }
  //去数据库中找指定省份所有城市的信息
  Cities.find({province: province, level: 2}, {city: 1, name: 1, _id: 0}, function (err, data) {
    if (!err && data.length) {
      //数据找到了
      res.send({status: 'ok', data: data});
    } else {
      //方法出错了或者数据没找到
      res.send({status: 'error'});
    }
  })
})

//接受请求，返回指定省份指定城市的所有区县信息
app.get('/getCounty', function (req, res) {
  //获取请求参数
  var province = req.query.province;
  var city = req.query.city;
  //为了减少数据库的操作
  if (!province || !city) {
    res.send({status: 'error'});
    return;
  }
  //去数据库中找指定省份指定城市的所有区县信息
  Cities.find({province: province, city: city, level: 3}, {county: 1, name: 1, _id: 0}, function (err, data) {
    if (!err && data.length) {
      //数据找到了
      res.send({status: 'ok', data: data});
    } else {
      //方法出错了或者数据没找到
      res.send({status: 'error'});
    }
  })
})

app.listen(3000, function (err) {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})