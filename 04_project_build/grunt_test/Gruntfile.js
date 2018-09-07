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
      all: ['Gruntfile.js', 'src/js/module3.js', 'src/js/module4.js', 'src/js/main.js']  //要检查的文件路径
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
          src:['js/module3.js', 'js/module4.js', 'js/main.js'], //所有js文件
          dest:'build/'    //输出到此目录下
        }]
      }
    },
    browserify: {  //将commonjs的模块化转化成浏览器能识别的语法  将所有依赖的模块全部打包生成一个模块输出
      dist: {
        files: {
          'build/js/app.js': ['build/js/main.js']
        }
      }
    },
    pkg: grunt.file.readJSON('package.json'),  //读取package.json文件的内容，返回一个变量pkg
    uglify: {   //压缩js
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'   //描述模块的信息
      },
      dist: {
        files: {   // 输出文件的路径 : 要处理文件的路径
          'dist/js/dist.min.js': ['build/js/app.js']
        }
      }
    },
    less: {  //将less文件编译成css文件, 将css文件的兼容性处理好
      production: {
        options: {
          paths: ['build/css'],   //css文件夹的路径
          plugins: [  //加载插件做相应的任务
            new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions", "not ie <= 8"]}), //自动扩展css前缀，解决css兼容性问题
          ]
        },
        files: {
          'build/css/built.css': 'src/less/*.less'
        }
      }
    },
    cssmin: {  //压缩css代码
      options: {
        mergeIntoShorthands: false, // 快速压缩代码
        roundingPrecision: -1  //不使用四舍五入
      },
      target: {
        files: {
          'dist/css/dist.min.css': ['build/css/built.css']
        }
      }
    },
    htmlmin: {   //压缩html
      dist: {
        options: {
          removeComments: true,      // 移除注释
          collapseWhitespace: true    //去除空格
        },
        files: {
          'dist/index.html': 'src/index.html',
        }
      },
      dev: {
        files: {
          'build/index.html': 'src/index.html'
        }
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
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  
  //3. 注册默认任务
  /*
    当你运行grunt指令时，会执行任务列表中的所有任务
    grunt.registerTask('default', [任务列表])
   */
  grunt.registerTask('default', ['jshint', 'babel', 'browserify', 'uglify', 'less', 'cssmin', 'htmlmin:dist']);  //执行任务是同步的，从左往右
  
};