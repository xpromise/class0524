//1. 引入插件模块
const gulp = require('gulp');
const jshint = require('gulp-jshint');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions', "not ie <= 8"] });
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const htmlmin = require('gulp-htmlmin');
const livereload = require('gulp-livereload');
const open = require('open');
const connect = require('gulp-connect');

//2. 配置插件任务
/*
  在gulp.task里面回调函数中，
    如果加上了return ，任务就是异步的
    如果不加return ，任务就是同步的
 */
/*gulp.task('jshint', () => {
  //任务的具体内容
  return gulp.src('./src/js/!*.js')   //将指定目录下的所有文件以nodejs流的方法导入gulp内存中
    .pipe(jshint({esversion: 6}))     //语法检查
    .pipe(jshint.reporter('default'));  //将语法错误提示出来
})
/!*
  gulp.task('任务一', ['任务二', '任务三'], () => {})
    等待'任务二', '任务三'全部执行完毕后，才会执行任务一
 *!/
gulp.task('babel', ['jshint'], () => {
  return gulp.src('src/js/!*.js')
    .pipe(babel({   //将流中的文件做好语法转换
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('build/js'))   //将流中的文件输出出去
})*/

gulp.task('jshintAndBabel', () => {
  return gulp.src('./src/js/*.js')   //将指定目录下的所有文件以nodejs流的方法导入gulp内存中
    .pipe(jshint({esversion: 6}))     //语法检查
    .pipe(jshint.reporter('default'))  //将语法错误提示出来
    .pipe(babel({   //将流中的文件做好语法转换
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('build/js'))   //将流中的文件输出出去
})

/*gulp.task('browserify', ['babel'], () => {
  return gulp.src('build/js/main.js')
    .pipe(browserify())   //将commonjs模块化语法转换浏览器能识别的语法
    .pipe(rename('app.js'))   //重命名内存中/流中文件
    .pipe(gulp.dest('./build/js'))
})

gulp.task('uglify', ['browserify'], () => {
  return gulp.src('build/js/app.js')
    .pipe(uglify())   //压缩js代码
    .pipe(rename('dist.min.js'))   //重命名内存中/流中文件
    .pipe(gulp.dest('./dist/js'))
})*/

gulp.task('browserifyAndUglify', ['jshintAndBabel'], () => {
  return gulp.src('build/js/main.js')
    .pipe(browserify())   //将commonjs模块化语法转换浏览器能识别的语法
    .pipe(rename('app.js'))   //重命名内存中/流中文件
    .pipe(gulp.dest('./build/js'))
    .pipe(uglify())   //压缩js代码
    .pipe(rename('dist.min.js'))   //重命名内存中/流中文件
    .pipe(gulp.dest('./dist/js'))
    .pipe(livereload())     //自动编译
})

/*gulp.task('less', () => {
  return gulp.src('./src/less/!*.less')
    .pipe(less({  //将less文件转换成css文件，并且扩展了css前缀
      plugins: [autoprefix]
    }))
    .pipe(gulp.dest('./build/css'));
})

gulp.task('concat', ['less'], () => {
  return gulp.src('./build/css/!*.css')
    .pipe(concat('built.css'))  //合并指定文件，命名合并后的文件
    .pipe(gulp.dest('./build/css'));
})

gulp.task('cssmin', ['concat'], () => {
  return gulp.src('./build/css/built.css')
    .pipe(cssmin())  //压缩指定css文件
    .pipe(rename('dist.min.css'))
    .pipe(gulp.dest('./dist/css'));
})*/

gulp.task('less', () => {
  return gulp.src('./src/less/*.less')
    .pipe(less({  //将less文件转换成css文件，并且扩展了css前缀
      plugins: [autoprefix]
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(concat('built.css'))  //合并指定文件，命名合并后的文件
    .pipe(gulp.dest('./build/css'))
    .pipe(cssmin())  //压缩指定css文件
    .pipe(rename('dist.min.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(livereload())     //自动编译
})

gulp.task('htmlmin', () => {
  return gulp.src('./src/index.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))  //压缩指定html文件
    .pipe(gulp.dest('./dist'))
    .pipe(livereload())     //自动编译
})

gulp.task('watch', ['default'], () => {
  //监听方法才能去执行相应任务
  livereload.listen();
  
  //启动服务，部署项目
  connect.server({
    root: 'dist',    //项目目录
    port: 3000,
    livereload: true  //热更新功能, 自动刷新页面
  });
  
  //打开网页
  open('http://localhost:3000');
  
  //监听文件发生的变化，一旦变化就自动执行后面的任务
  gulp.watch('src/less/*.less', ['less']);
  gulp.watch('src/js/*.js', ['browserifyAndUglify']);
  gulp.watch('src/index.html', ['htmlmin']);
})

//3. 配置默认任务
gulp.task('default', ['browserifyAndUglify', 'less', 'htmlmin']);