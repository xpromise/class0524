/*
  1. 全局安装grunt-cli包
  2. 本地安装grunt包
  3. 本地运行grunt指令时，它会去当前目录下查找Gruntfile.js配置文件，读取其中的配置，执行里面的任务
 */

module.exports = function (grunt) {
  //1. 配置任务的具体内容
  /*
    配置某个插件/任务具体做什么工作
   */
  grunt.initConfig({
    jshint: {   //任务名  语法检查
      options: {   //语法检查的具体规则
        curly: true,      //循环加上{}
        eqeqeq: true,     //使用====
        eqnull: true,     //禁止使用 == null
        browser: true,    //浏览器的提供全局对象或者函数，不会报错
        esversion: 6,     //检查es6
        globals: {
          jQuery: true    //让引入第三方库不会报错
        },
      },
      all: ['Gruntfile.js', 'src/js/*.js']  //要检查的文件路径
    },
    babel: {
      options: {    //配置选项
        // sourceMap: true,   //生成.map文件，帮助分析错误的
        presets: ['@babel/preset-env']   //  文件.babelrc，当运行babel时读取的参数
      },
      dist: {   //文件处理方法
        files: [{
          expand:true,     //如果设为true，就表示下面文件名的占位符（即*号）都要扩展成具体的文件名。
          cwd:'src/',      //js目录下
          src:['js/*.js'], //所有js文件
          dest:'build/'    //输出到此目录下
        }]
      }
    }
  });
  
  //2. 加载任务插件
  /*
    将插件包给引入进来（相当于require）
    grunt.loadNpmTasks('插件包名称');
   */
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-babel');
  
  //3. 注册默认任务
  /*
    当你运行grunt指令时，会执行任务列表中的所有任务
    grunt.registerTask('default', [任务列表])
   */
  grunt.registerTask('default', ['jshint', 'babel']);  //执行任务是同步的，从左往右
  
};