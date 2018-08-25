//引入express模块
var express = require('express');
//引入session
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
//连接数据库
require('./db');
//引入路由器模块
var userRouter = require('./router/userRouter');
var userfaceRouter = require('./router/userfaceRouter');

//创建应用对象
var app = express();
//设置模板资源目录
app.set('views', './views');
//设置模板引擎
app.set('view engine', 'ejs');

//应用session
/*
  解析cookie中session_id ， 根据id值自动帮你找到对应的session对象
  将session对象保存的数据，挂载到req.session
 */
app.use(session({
  secret: 'hello atguigu class0524',  //参与session_id加密的字符串
  saveUninitialized: false, // 在没有保存session对象不要创建
  resave: false, // 如果没有修改不要重新保存session
  store: new MongoStore({
    url: 'mongodb://localhost:27017/exec',
    touchAfter: 24 * 3600 // 指定时间内更新一次
  })
}));

//主模块应用路由器
app.use(userRouter);
app.use(userfaceRouter);

//监听端口号
app.listen(3000, function (err) {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})