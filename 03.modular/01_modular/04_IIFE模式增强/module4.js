/**
 * IIFE模式增强 : 引入依赖
 * 这就是现代模块实现的基石
 */


(function (window, $) {
  const msg = 'hello atguigu';
  function add(x, y) {
    return x + y;
  }
  function mul(x, y) {
    return x * y;
  }
  $('body').append(`<h1>${msg}</h1>`);
  window.add = add;
  window.mul = mul;
})(window, jQuery)