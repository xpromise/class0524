/*
  定义一个有名字的模块，模块名就不能修改了
  define('模块名称', ['m1', 'm2'], (m1, m2) => {})
 */

define('math', ['jquery'], $ => {
  console.log('math模块被加载了');
  
  $('body').append('<h1>hello atguigu</h1>');
  function add(x, y) {
    return x + y;
  }
  return add;
})