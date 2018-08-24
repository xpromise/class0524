//引入express
var express = require('express');
//引入path，此模块是node的核心模块，专门用来解析处理路径问题的
var path = require('path');
//创建路由器对象
var router = express.Router();

//用户访问登录页面的路由
router.get('/userLogin', function (req, res) {
  //返回登录页面给用户
  // C:\Users\web\Desktop\0524\class0524\01.nodejs\day04\04_exec_router\router\public\login.html
  //将传入路径解析成绝对路径返回
  // var filePath = path.resolve(__dirname, '../', 'public/login.html');
  var filePath = path.resolve(__dirname, '../public/login.html');
  console.log(filePath);  //C:\Users\web\Desktop\0524\class0524\01.nodejs\day04\04_exec_router\public\login.html
  res.sendFile(filePath);
})
//用户访问注册页面的路由
router.get('/userRegist', function (req, res) {
  //返回注册页面给用户
  var filePath = path.resolve(__dirname, '../public/regist.html');
  res.sendFile(filePath);
})


//暴露出去
module.exports = router;