//引入express
var express = require('express');
//引入sha1加密模块
var sha1 = require('sha1');
//引入body-parser模块
var bodyParser = require('body-parser');
//引入Users模块
var Users = require('../model/Users');
//创建路由器对象,可以看做小型的app对象
var router = express.Router();
//业务逻辑

//应用第三方中间件，解析请求体中的参数，挂载到req.body上
router.use(bodyParser.urlencoded({extended: true}));

//正则表达式
var usernameReg = /^[A-Za-z_0-9]{5,10}$/     //用户可以输入英文、数字、下划线，长度为5-10位
var pwdReg = /^[A-Za-z_0-9]{6,18}$/     //可以输入英文、数字、下划线，长度为6-18位
var emailReg = /^[A-Za-z_0-9]{3,10}@[A-Za-z_0-9]{2,5}\.com$/

//应用级中间件，定义中间件函数
function regTest(req, res, next) {
  //  1. 获取用户填写的信息
  var username = req.body.username;
  var pwd = req.body.pwd;
  var rePwd = req.body.rePwd;
  var email = req.body.email;
  var type = req.body.type;
  //解构赋值
  // const {username, pwd, rePwd, email, type} = req.body;
  console.log(type); // regist
  
  //初始化一个errMsg对象，保存用户的账号和邮箱
  var errMsg = {
    username: username,
    email: email
  };
  
  // 2. 判断密码和确认密码是否一致
  if (type === 'regist' && pwd !== rePwd) {
    //返回响应，错误提示给用户
    errMsg.rePwdErr = '两次输入的密码不一致，请重新输入~~';
  }
  
  // 3. 正则验证用户填写的信息是否规范
  if (!usernameReg.test(username)) {
    //返回响应，错误提示给用户
    errMsg.usernameErr = '用户名不符合规范，可以输入英文、数字、下划线，长度为5-10位';
  }
  if (!pwdReg.test(pwd)) {
    //返回响应，错误提示给用户
    errMsg.pwdErr = '密码不符合规范，可以输入英文、数字、下划线，长度为6-18位';
  }
  if (type === 'regist' && !emailReg.test(email)) {
    //返回响应，错误提示给用户
    errMsg.emailErr = '邮箱不符合规范';
  }
  
  //挂载到响应对象上res
  res.errMsg = errMsg;
  
  //说明用户填写的信息是OK
  next();
  
}

/*
  1. 当用户登录/注册失败时，应该保留用户名/邮箱信息
  2. 当用户注册成功时，跳转到登录页面，url地址没有变化，应该改变为userLogin
 */

//设置路由
//处理登录逻辑的路由
router.post('/login', regTest, function (req, res) {
  /*
    1. 获取用户填写的信息
    2. 对用户填写的信息做正则验证
    3. 去数据库查找对应用户
   */
  //  1. 获取用户填写的信息
  var username = req.body.username;
  var pwd = req.body.pwd;
  var errMsg = res.errMsg;
  
  //判断有没有产生过错误
  if (errMsg.usernameErr || errMsg.pwdErr) {
    //说明产生了错误
    res.render('login', {errMsg: errMsg});
    return;
  }
  
  // 3. 去数据库查找对应用户
  Users.findOne({username: username, pwd: sha1(pwd)}, function (err, data) {
    if (!err && data) {
      //用户登录成功，设置一个cookie，保存用户的信息
      res.cookie('user_id', data.id, {maxAge: 1000 * 3600 * 24 * 7})
      res.redirect('/userCenter');
    } else {
      errMsg.err = '用户名或者密码错误';
      res.render('login', {errMsg: errMsg});
    }
  })
  
})
//处理注册逻辑的路由
router.post('/regist', regTest, function (req, res) {
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
  var username = req.body.username;
  var pwd = req.body.pwd;
  var email = req.body.email;
  var errMsg = res.errMsg;
  
  //判断有没有产生过错误
  if (errMsg.usernameErr || errMsg.pwdErr || errMsg.rePwdErr || errMsg.emailErr) {
    //说明产生了错误
    res.render('regist', {errMsg: errMsg});
    return;
  }
  
  
  // 4. 去数据库中查找是否有相同用户名
  Users.findOne({username: username}, function (err, data) {
    if (!err && !data) {
      //方法没有出错并且没有找到相同的用户名
      // 5. 将用户的信息保存数据库中，注册成功
      Users.create({username: username, pwd: sha1(pwd), email: email}, function (err) {
        if (!err) res.redirect('/userLogin');
        else console.log(err);
      })
    } else {
      //方法出错了或者找到了相同的用户名
      //返回响应，错误提示给用户
      errMsg.usernameErr = '用户名已存在，请重新输入~';
      res.render('regist',{errMsg: errMsg});
    }
  })
  
})

//暴露路由器对象出去
module.exports = router;