/*
  定义一个没有依赖的模块
 */

define(() => {
  console.log('dataServer模块被加载了');
  
  //模块内部内容
  const msg = 'hello atguigu';
  
  function dataServer() {
    return msg.toUpperCase();
  }
  
  //暴露出去
  // 暴露一个内容  return 内容
  // 暴露多个内容  return {a: xxx, b: xxx}
  return dataServer;
})