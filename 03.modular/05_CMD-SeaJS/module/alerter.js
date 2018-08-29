/*
  定义一个有依赖的模块
 */

define((require, exports, module) => {
  //引入模块
  const dataServer = require('./dataServer');
  
  const msg = dataServer.dataServer();
  
  function alerter() {
    alert(msg);
  }
  
  //暴露出去
  module.exports = alerter;
  
})