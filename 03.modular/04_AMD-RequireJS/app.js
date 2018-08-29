/*
  主模块
 */
//配置模块的路径
requirejs.config({
  baseUrl: './',  //模块的公共路径
  paths: {       //配置具体模块的路径
    alerter: 'module/alerter',  //不能写文件后缀名
    dataServer: 'module/dataServer',
    jquery: 'lib/jquery-1.10.1',  //引入第三方库要注意名字问题
    math: 'module/math'
  }
})

//应用其他模块
requirejs(['jquery', 'math'], ($, math) => {
  $('body').css('background', 'pink');
  
  $('#btn').click(() => {
    //按需加载的功能
    require(['alerter'], alerter => {
      alerter();
    })
  })
  
  console.log(math(2, 6));
})

