/*
  1. 实现 http server
 */
const http = require('http');

//定义类
class Application {
  //类的构造方法
  constructor () {
  
  }
  
  //实现use
  use(fn) {
    this.callbackFunc = fn;
  }
  
  listen(...args) {
    //创建http server
    const server = http.createServer(this.callback());
    //监听端口号
    server.listen(...args);
  }
  
  callback() {
    return (req, res) => {
      this.callbackFunc(req, res);
    }
  }

}

module.exports = Application;