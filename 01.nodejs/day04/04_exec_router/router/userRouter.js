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
  console.log(type); // regist
  
  // 2. 判断密码和确认密码是否一致
  if (type === 'regist' && pwd !== rePwd) {
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
  } else if (type === 'regist' && !emailReg.test(email)) {
    //返回响应，错误提示给用户
    res.send('邮箱不符合规范');
    return;
  }
  
  //说明用户填写的信息是OK
  next();
  
}

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

//暴露路由器对象出去
module.exports = router;