//引入express
var express = require('express');
//创建路由器对象
var router = express.Router();

//用户访问登录页面的路由
router.get('/userLogin', function (req, res) {
  //返回登录页面给用户
  res.sendFile(__dirname + '/public/login.html');
})
//用户访问注册页面的路由
router.get('/userRegist', function (req, res) {
  //返回注册页面给用户
  res.sendFile(__dirname + '/public/regist.html');
})


//暴露出去
module.exports = router;