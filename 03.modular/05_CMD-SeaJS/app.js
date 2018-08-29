
define((require, exports, module) => {
  //引入模块
  // const alerter = require('./module/alerter');
  // alerter();
  //异步引入模块
  /*
    require.async(['模块1路径'], 模块1 => {})
   */
  require.async(['./module/alerter'], alerter => {
    alerter();
  })
  
  console.log('************');
  
})