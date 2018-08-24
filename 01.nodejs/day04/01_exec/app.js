//引入express模块
var express = require('express');
//引入sha1加密模块
var sha1 = require('sha1');
//连接数据库
require('./db');
//引入Users模块
var Users = require('./model/Users');

//正则表达式
var usernameReg = /^[A-Za-z_0-9]{5,10}$/     //用户可以输入英文、数字、下划线，长度为5-10位
var pwdReg = /^[A-Za-z_0-9]{6,18}$/     //可以输入英文、数字、下划线，长度为6-18位
var emailReg = /^[A-Za-z_0-9]{3,10}@[A-Za-z_0-9]{2,5}\.com$/
/*
  加密：以不可逆方式加密
    md5
    sha1
 */

//创建应用对象
var app = express();
//设置路由
//处理登录逻辑的路由
app.get('/login', function (req, res) {
  /*
    1. 获取用户填写的信息
    2. 对用户填写的信息做正则验证
    3. 去数据库查找对应用户
   */
  //  1. 获取用户填写的信息
  var username = req.query.username;
  var pwd = req.query.pwd;
  
  // 2. 对用户填写的信息做正则验证
  if (!usernameReg.test(username)) {
    //返回响应，错误提示给用户
    res.send('用户名不符合规范，可以输入英文、数字、下划线，长度为5-10位');
    return;
  } else if (!pwdReg.test(pwd)) {
    //返回响应，错误提示给用户
    res.send('密码不符合规范，可以输入英文、数字、下划线，长度为6-18位');
    return;
  }
  
  // 3. 去数据库查找对应用户
  Users.findOne({username: username, pwd: sha1(pwd)}, function (err, data) {
    if (!err && data) {
      res.send('登录成功~~' + username);
    } else {
      res.send('登录失败，用户名或者密码错误');
    }
  })
  
})
//处理注册逻辑的路由
app.get('/regist', function (req, res) {
  /*
    1. 获取用户填写的信息
    2. 判断密码和确认密码是否一致
    3. 正则验证用户填写的信息是否规范
    4. 去数据库中查找是否有相同用户名，
        如果有的话，返回注册失败
    5. 将用户的信息保存数据库中，注册成功
       加密用户密码
   */
  
  // 1. 获取用户填写的信息
  // console.log(req.query);
  var username = req.query.username;
  var pwd = req.query.pwd;
  var rePwd = req.query.rePwd;
  var email = req.query.email;
  
  // 2. 判断密码和确认密码是否一致
  if (pwd !== rePwd) {
    //返回响应，错误提示给用户
    res.send('两次输入的密码不一致，请重新输入~~');
    return;
  }
  
  // 3. 正则验证用户填写的信息是否规范
  
  
  if (!usernameReg.test(username)) {
    //返回响应，错误提示给用户
    res.send('用户名不符合规范，可以输入英文、数字、下划线，长度为5-10位');
    return;
  } else if (!pwdReg.test(pwd)) {
    //返回响应，错误提示给用户
    res.send('密码不符合规范，可以输入英文、数字、下划线，长度为6-18位');
    return;
  } else if (!emailReg.test(email)) {
    //返回响应，错误提示给用户
    res.send('邮箱不符合规范');
    return;
  }
  
  // 4. 去数据库中查找是否有相同用户名
  Users.findOne({username: username}, function (err, data) {
    if (!err && !data) {
      //方法没有出错并且没有找到相同的用户名
      // 5. 将用户的信息保存数据库中，注册成功
      Users.create({username: username, pwd: sha1(pwd), email: email}, function (err) {
        if (!err) res.send('注册成功~');
        else console.log(err);
      })
    } else {
      //方法出错了或者找到了相同的用户名
      //返回响应，错误提示给用户
      res.send('用户名已存在，请重新输入~');
    }
  })
  
})

//用户访问登录页面的路由
app.get('/userLogin', function (req, res) {
  //返回登录页面给用户
  res.sendFile(__dirname + '/public/login.html');
})
//用户访问注册页面的路由
app.get('/userRegist', function (req, res) {
  //返回注册页面给用户
  res.sendFile(__dirname + '/public/regist.html');
})

//监听端口号
app.listen(3000, function (err) {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})