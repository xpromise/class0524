//引入express
var express = require('express');
//引入path，此模块是node的核心模块，专门用来解析处理路径问题的
var path = require('path');
//引入Users
var Users = require('../model/Users');
//创建路由器对象
var router = express.Router();

//用户访问登录页面的路由
router.get('/userLogin', function (req, res) {
  //返回登录页面给用户
  // C:\Users\web\Desktop\0524\class0524\01.nodejs\day04\04_exec_router\router\public\login.html
  //将传入路径解析成绝对路径返回
  // var filePath = path.resolve(__dirname, '../', 'public/login.html');
  var filePath = path.resolve(__dirname, '../public/login.html');
  // console.log(filePath);  //C:\Users\web\Desktop\0524\class0524\01.nodejs\day04\04_exec_router\public\login.html
  res.sendFile(filePath);
})
//用户访问注册页面的路由
router.get('/userRegist', function (req, res) {
  //返回注册页面给用户
  var filePath = path.resolve(__dirname, '../public/regist.html');
  res.sendFile(filePath);
})
//用户个人中心页面
router.get('/userCenter', function (req, res) {
  //获取cookie
  var user_id = req.session.user_id;
  
  if (user_id) {
    //去数据库查找是否有当前id的用户
    Users.findById({_id: user_id}, function (err, data) {
      if (!err && data) {
        //用户存在，可以访问当前页面
        //返回个人中心页面给用户
        var filePath = path.resolve(__dirname, '../public/user.html');
        res.sendFile(filePath);
      } else {
        //方法出错或者用户不存在
        res.redirect('/userLogin');
      }
    })
    
  } else {
    //用户没有登录过或者清除过浏览器的cookie,重定向到登录页面
    res.redirect('/userLogin');
  }
  
  
  
})


//暴露出去
module.exports = router;