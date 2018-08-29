/*
  定义一个没有依赖的模块
 */

define((require, exports, module) => {
  const msg = 'hello atguigu';
  
  function dataServer() {
    return msg.toUpperCase();
  }
  //暴露模块
  // module.exports = dataServer;
  exports.dataServer = dataServer;
  
})