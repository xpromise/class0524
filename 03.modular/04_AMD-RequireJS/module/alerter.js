/*
定义一个有依赖的模块
  define(['m1', 'm2', ...], (m1, m2, ...) => {})
 */

define(['dataServer'], dataServer => {
  console.log('alerter模块被加载了');
  //定义模块的内容
  const msg = dataServer();
  
  function alerter() {
    alert(msg);
  }
  
  //暴露出去
  return alerter;
})